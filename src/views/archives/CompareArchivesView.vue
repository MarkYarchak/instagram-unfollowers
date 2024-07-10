<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useInstagramArchive } from '@/composables/instagram-archive';
import ComparedConnections from '@/components/compare/ComparedConnections.vue';
import type { ConnectionsData } from '@/composables/instagram-connections';

interface Props {
  connectionsData?: ConnectionsData;
  error?: Error;
}
defineProps<Props>();

const route = useRoute();
const compareId = Number(route.params.compareId);

const instagramArchive = useInstagramArchive(compareId);
const compareConnectionsData = ref<ConnectionsData>();
const compareError = ref<Error>();

instagramArchive
  .parseConnectionsData()
  .then(setCompareConnectionsData)
  .catch(catchParsingError);

function setCompareConnectionsData(data: ConnectionsData) {
  compareConnectionsData.value = data;
}

function catchParsingError(err: Error) {
  compareError.value = err;
}
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
    class="my-3"
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

  <ComparedConnections
    v-if="connectionsData && compareConnectionsData"
    :connections-data="connectionsData"
    :compare-connections-data="compareConnectionsData"
  />
  <div v-else class="d-flex justify-center py-5">
    <v-progress-circular
      indeterminate
      size="50"
    />
  </div>
</template>
