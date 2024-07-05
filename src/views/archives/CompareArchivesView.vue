<script lang="ts" setup>
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface Props {
  filesContent?: ParsedFilesContent;
  error?: Error;
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

    <v-toolbar-title>Compare archives</v-toolbar-title>
  </v-toolbar>

  <v-alert
    type="warning"
    class="mt-3"
  >
    <v-alert-title>In development</v-alert-title>
    <div>This feature is in development. Contact the author to details</div>

    <template #append>
      <v-btn
        to="/"
      >
        <v-icon start>mdi-home</v-icon>
        Home <span class="d-none d-sm-inline">page</span>
      </v-btn>
    </template>
  </v-alert>
</template>
