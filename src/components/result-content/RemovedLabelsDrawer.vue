<script setup lang="ts">
import RemovedLabelAccounts from '@/components/labels/RemovedLabelAccounts.vue';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface Props {
  filesContent: ParsedFilesContent;
}

defineProps<Props>();

const show = defineModel<boolean>('show');

function close() {
  show.value = false;
}
</script>

<template>
  <v-navigation-drawer
    v-model="show"
    :permanent="$vuetify.display.mdAndUp"
    location="right"
    width="400"
  >
    <template #prepend>
      <v-toolbar>
        <v-btn
          icon="mdi-close"
          @click="close"
        ></v-btn>
        <v-toolbar-title>Removed</v-toolbar-title>
        <v-btn
          :to="{ name: 'preview-result-trash' }"
          icon="mdi-arrow-expand-all"
        ></v-btn>
      </v-toolbar>
    </template>

    <RemovedLabelAccounts :files-content="filesContent" />
  </v-navigation-drawer>
</template>
