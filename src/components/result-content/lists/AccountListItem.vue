<script setup lang="ts">
import { computed } from 'vue';
import AccountItemMenu from '@/components/result-content/lists/AccountItemMenu.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';

interface Props {
  account: ConnectionAccount;
  selectable?: boolean;
}

const props = defineProps<Props>();

const accountValue = computed(() => props.account.username || props.account.title);
const formattedTimestamp = computed(() => formatTimestamp(props.account.timestamp));

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}
</script>

<template>
  <v-list-item :value="selectable ? account : null">
    <template v-if="selectable" #prepend="{ isActive }">
      <v-list-item-action start>
        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title>{{ accountValue }}</v-list-item-title>
    <v-list-item-subtitle v-if="account.timestamp || $slots['item-subtitle']?.length">
      <slot name="subtitle" :item="account">
        {{ formattedTimestamp }}
      </slot>
    </v-list-item-subtitle>

    <template #append>
      <v-list-item-action end>
        <v-btn
          :href="account.href"
          target="_blank"
          variant="flat"
          color="blue-grey-lighten-4"
          class="mr-3"
          @click.stop=""
        >
          <v-icon :start="$vuetify.display.smAndUp">mdi-instagram</v-icon>
          <span v-if="$vuetify.display.smAndUp">Open</span>
        </v-btn>
        <AccountItemMenu v-if="selectable" :item="account">
          <template #activator="{ props }">
            <v-btn
              variant="text"
              icon="mdi-dots-vertical"
              v-bind="props"
            ></v-btn>
          </template>
        </AccountItemMenu>

        <slot name="actions" :item="account"></slot>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>
