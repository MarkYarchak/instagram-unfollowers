<script lang="ts" setup>
import { computed, ref, inject, defineAsyncComponent } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useAccountsWhitelist } from '@/composables/account-labels/whitelist';
import { useRemovedAccountsStorage } from '@/composables/account-labels/removed';
import type { ConnectionAccount } from '@/composables/instagram-connections';

const SearchFiled = defineAsyncComponent(() => import('@/components/SearchFiled.vue'));
const SelectCompareDialog = defineAsyncComponent(() => import('@/components/archives/SelectCompareDialog.vue'));

interface Props {
  loading?: boolean;
  error?: Error | null;
}

defineProps<Props>();

const archiveId = inject<number>('archiveId', -1);

const selected = defineModel<ConnectionAccount[]>('selected', { required: true });
const search = defineModel<string>('search');

const emit = defineEmits(['click:trash']);

const display = useDisplay();
const theme = useTheme();
const showSearch = ref<boolean>(false);
const mobileSearchOpen = computed(() => display.xs.value && showSearch.value);
const title = computed(() => selected.value.length || 'Preview');
const toolbarColor = computed(() => selected.value.length ? (theme.current.value.dark ? 'blue-grey-darken-4' : 'blue-grey-lighten-4') : undefined);

function onSearchFieldBlur() {
  if (!search.value) {
    showSearch.value = false;
  }
}

function runCancelAction() {
  if (selected.value.length) {
    return cancelSelection();
  }
  if (showSearch.value) {
    return cancelSearch();
  }
}

function cancelSearch() {
  search.value = '';
  showSearch.value = false;
}

function cancelSelection() {
  selected.value = [];
}

const accountsWhitelist = useAccountsWhitelist();

function whitelistSelected() {
  accountsWhitelist
    .addItems(selected.value, archiveId)
    .then(cancelSelection);
}

const removedAccountsStorage = useRemovedAccountsStorage();

function removeSelected() {
  removedAccountsStorage
    .addItems(selected.value, archiveId)
    .then(cancelSelection);
}

const showCompareDialog = ref<boolean>(false);

function toggleCompareDialog() {
  showCompareDialog.value = !showCompareDialog.value;
}
</script>

<template>
  <v-toolbar :color="toolbarColor">
    <v-btn
      v-if="mobileSearchOpen || selected.length"
      icon="mdi-close"
      @click="runCancelAction"
    ></v-btn>
    <v-btn
      v-else
      to="/preview"
      icon="mdi-arrow-left"
    ></v-btn>

    <v-toolbar-title v-if="!mobileSearchOpen">
      {{ title }}
    </v-toolbar-title>

    <template v-if="selected.length">
      <v-btn
        icon="mdi-check"
        class="mr-3"
        @click="whitelistSelected"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        class="mr-3"
        @click="removeSelected"
      ></v-btn>
      <v-divider vertical />
    </template>
    <template v-else>
      <SearchFiled
        v-if="showSearch"
        v-model="search"
        :clearable="$vuetify.display.smAndUp"
        :debounce="300"
        label="Search for people"
        flat
        autofocus
        @blur="onSearchFieldBlur"
      />
      <v-btn
        v-else
        icon="mdi-magnify"
        @click="showSearch = true"
      ></v-btn>
      <v-btn
        v-if="!mobileSearchOpen"
        :disabled="loading || !!error"
        icon="mdi-file-compare"
        class="ml-3"
        @click="toggleCompareDialog"
      ></v-btn>
    </template>

    <v-btn
      v-if="!mobileSearchOpen"
      :loading="loading"
      :disabled="!!error"
      :to="$vuetify.display.xs ? { name: 'preview-result-trash' } : undefined"
      exact
      icon="mdi-delete-clock"
      class="mx-3"
      @click="$vuetify.display.smAndUp && emit('click:trash', $event)"
    ></v-btn>
  </v-toolbar>

  <SelectCompareDialog v-model:show="showCompareDialog" />
</template>
