<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useAccountsWhitelist } from '@/composables/account-labels/whitelist';
import { useRemovedAccountsStorage } from '@/composables/account-labels/removed';
import type { ConnectionAccount } from '@/composables/instagram-connections';

interface Props {
  item: ConnectionAccount;
}

const props = defineProps<Props>();

const archiveId = inject<number>('archiveId');
const accountsWhitelist = useAccountsWhitelist();
const removedAccountsStorage = useRemovedAccountsStorage();
const showAlertSnackbar = ref(false);
const alertSnackbarText = ref('');

const items = [
  {
    title: 'Whitelist',
    icon: 'mdi-check',
    action: addToWhitelist,
  },
  {
    title: 'Remove',
    icon: 'mdi-delete',
    action: remove,
  },
];

function addToWhitelist() {
  if (!archiveId) {
    return;
  }
  accountsWhitelist
    .addItem(props.item, archiveId)
    .catch(err => showAlert(err.message));
}

function remove() {
  if (!archiveId) {
    return;
  }
  removedAccountsStorage
    .addItem(props.item, archiveId)
    .catch(err => showAlert(err.message));
}

function showAlert(text: string) {
  alertSnackbarText.value = text;
  showAlertSnackbar.value = true;
}
</script>

<template>
  <v-menu
    location="start"
    transition="slide-x-reverse-transition"
  >
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="item.action"
      >
        <template #prepend>
          <v-list-item-media start>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-snackbar
    v-model="showAlertSnackbar"
    multi-line
  >
    {{ alertSnackbarText }}

    <template #actions>
      <v-btn
        color="red"
        variant="text"
        @click="showAlertSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
