<script lang="ts" setup>
import { provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArchiveStorage } from '@/composables/archive-storage';
import { useArchiveReader } from '@/composables/archive-reader';
import { useInstagramConnections } from '@/composables/instagram-connections';
import type { ArchiveItem } from '@/db/archives-db';
import type { UnarchivedEntries } from '@/composables/archive-reader';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

const route = useRoute();
const archiveId = Number(route.params.archiveId);

provide('archiveId', archiveId);

const archiveStorage = useArchiveStorage();
const archiveReader = useArchiveReader();
const parsedFilesContent = ref<ParsedFilesContent>();
const error = ref<Error>();

loadArchive()
  .then(parseArchive)
  .then(loadContentFiles)
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

async function loadContentFiles(fileEntries: UnarchivedEntries) {
  const instagramConnections = useInstagramConnections();
  parsedFilesContent.value = await instagramConnections.parseFollowersAndFollowing(fileEntries);
}

function catchParsingError(err: Error) {
  error.value = err;
}
</script>

<template>
  <v-container>
    <router-view
      :files-content="parsedFilesContent"
      :error="error"
    />
  </v-container>
</template>
