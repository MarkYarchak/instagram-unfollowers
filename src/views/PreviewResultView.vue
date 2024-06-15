<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useArchiveStorage } from '@/composables/archive-storage';
import { useArchiveReader } from '@/composables/archive-reader';
import PreviewResultContent from '@/components/PreviewResultContent.vue';
import type { UnarchivedEntries } from '@/composables/archive-reader';
import type { ArchiveItem } from '@/db/archives-db';

const route = useRoute();
const display = useDisplay();
const archiveId = Number(route.params.archiveId);
const archiveStorage = useArchiveStorage();
const archiveReader = useArchiveReader();
const fileEntries = ref<UnarchivedEntries>();
const search = ref<string>('');
const showSearch = ref<boolean>(false);
const error = ref<Error>();

const mobileSearchOpen = computed(() => display.xs.value && showSearch.value);

loadArchive()
  .then(parseArchive)
  .then(setEntries)
  .catch(catchUnpackingError);

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

function setEntries(entries: UnarchivedEntries) {
  fileEntries.value = entries;
}

function onSearchFieldBlur() {
  if (!search.value) {
    showSearch.value = false;
  }
}

function catchUnpackingError(err: Error) {
  error.value = err;
}
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-btn
        to="/preview"
        icon="mdi-arrow-left"
      ></v-btn>
      <v-toolbar-title v-if="!mobileSearchOpen">Preview</v-toolbar-title>
      <v-spacer v-if="!mobileSearchOpen" />

      <v-text-field
        v-if="showSearch"
        v-model="search"
        label="Search for people"
        autofocus
        variant="solo"
        flat
        hide-details
        class="mx-1"
        @blur="onSearchFieldBlur"
      />
      <v-btn
        v-else
        icon="mdi-magnify"
        class="mr-2"
        @click="showSearch = true"
      ></v-btn>
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
    <PreviewResultContent
      v-else-if="fileEntries"
      :file-entries="fileEntries"
      :search="search"
    />
    <div v-else class="d-flex justify-center py-5">
      <v-progress-circular
        indeterminate
        size="50"
      />
    </div>
  </v-container>
</template>
