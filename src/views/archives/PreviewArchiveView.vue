<script lang="ts" setup>
import { provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useInstagramArchive } from '@/composables/instagram-archive';
import type { ConnectionsData } from '@/composables/instagram-connections';

const route = useRoute();
const archiveId = Number(route.params.archiveId);

provide('archiveId', archiveId);

const instagramArchive = useInstagramArchive(archiveId);
const connectionsData = ref<ConnectionsData>();
const error = ref<Error>();

instagramArchive
  .parseConnectionsData()
  .then(setConnectionsData)
  .catch(catchParsingError);

function setConnectionsData(data: ConnectionsData) {
  connectionsData.value = data;
}

function catchParsingError(err: Error) {
  error.value = err;
}
</script>

<template>
  <v-container>
    <router-view
      :connections-data="connectionsData"
      :error="error"
    />
  </v-container>
</template>
