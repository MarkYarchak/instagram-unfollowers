<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import PreviewResultToolbar from '@/components/result-content/PreviewResultToolbar.vue';
import PreviewResultContent from '@/components/result-content/PreviewResultContent.vue';
import type { ConnectionAccount, ConnectionsData } from '@/composables/instagram-connections';

const RemovedLabelsDrawer = defineAsyncComponent(() => import('@/components/result-content/RemovedLabelsDrawer.vue'));

interface Props {
  connectionsData?: ConnectionsData;
  error?: Error;
}

defineProps<Props>();

const selectedAccounts = ref<ConnectionAccount[]>([]);
const search = ref<string>('');
const showLabelsDrawer = ref<boolean>(false);

function toggleLabelsDrawer() {
  showLabelsDrawer.value = !showLabelsDrawer.value;
}
</script>

<template>
  <PreviewResultToolbar
    v-model:search="search"
    v-model:selected="selectedAccounts"
    :loading="!connectionsData && !error"
    :error="error"
    @click:trash="toggleLabelsDrawer"
  />

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
  <PreviewResultContent
    v-else-if="connectionsData"
    v-model:selected-items="selectedAccounts"
    :connections-data="connectionsData"
    :search="search"
  />
  <div v-else class="d-flex justify-center py-5">
    <v-progress-circular
      indeterminate
      size="50"
    />
  </div>

  <RemovedLabelsDrawer
    v-if="$vuetify.display.smAndUp && connectionsData"
    v-model:show="showLabelsDrawer"
    :connections-data="connectionsData"
  />
</template>
