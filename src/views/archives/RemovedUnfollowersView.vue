<script setup lang="ts">
import RemovedLabelAccounts from '@/components/labels/RemovedLabelAccounts.vue';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface Props {
  filesContent?: ParsedFilesContent;
  error?: Error | null;
}

defineProps<Props>();
</script>

<template>
  <v-toolbar>
    <v-btn
      :to="{ name: 'preview-result' }"
      exact
      icon="mdi-arrow-left"
    ></v-btn>
    <v-toolbar-title>Removed Unfollowers</v-toolbar-title>
  </v-toolbar>

  <v-alert
    v-if="error"
    type="error"
    variant="tonal"
    border="start"
    class="mt-4 mx-2"
  >
    <v-alert-title>{{ error.name }}</v-alert-title>
    <div>{{ error.message }}</div>
  </v-alert>
  <RemovedLabelAccounts
    v-else-if="filesContent"
    :files-content="filesContent"
  />
  <div v-else class="d-flex justify-center py-5">
    <v-progress-circular
      indeterminate
      size="50"
    />
  </div>
</template>
