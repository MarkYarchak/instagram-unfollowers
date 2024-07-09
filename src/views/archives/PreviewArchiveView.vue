<script lang="ts" setup>
import { provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArchiveStorage } from '@/composables/archive-storage';
import { useArchiveReader } from '@/composables/archive-reader';
import { useInstagramConnections } from '@/composables/instagram-connections';
import type { ArchiveItem } from '@/db/archives-db';
import type { UnarchivedEntries } from '@/composables/archive-reader';
import type { ParsedFilesContent, ConnectionsData } from '@/composables/instagram-connections';

const route = useRoute();
const archiveId = Number(route.params.archiveId);

provide('archiveId', archiveId);

const archiveStorage = useArchiveStorage();
const archiveReader = useArchiveReader();
const instagramConnections = useInstagramConnections();
const connectionsData = ref<ConnectionsData>();
const error = ref<Error>();

loadArchive()
  .then(parseArchive)
  .then(loadContentFiles)
  .then(prepareConnectionsData)
  .catch(catchParsingError);

async function loadArchive() {
  const archive = await archiveStorage.getItem(archiveId);
  if (!archive) {
    throw new Error('Archive not found');
  }
  return archive;
}

async function parseArchive(archive: ArchiveItem) {
  const { entries } = await archiveReader.unzip(archive);
  return entries;
}

function loadContentFiles(fileEntries: UnarchivedEntries) {
  return instagramConnections.parseFollowersAndFollowing(fileEntries);
}

function prepareConnectionsData(filesContent: ParsedFilesContent) {
  connectionsData.value = instagramConnections.getFullData(filesContent);
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
