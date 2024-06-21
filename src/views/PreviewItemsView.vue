<script setup lang="ts">
import { computed } from 'vue';
import { useArchiveStorage } from '@/composables/archive-storage';
import { UPLOAD_DIALOG_QUERY } from '@/constants/drawers';
import ArchivesList from '@/components/archives/ArchivesList.vue';

const archiveStorage = useArchiveStorage();
const archives = archiveStorage.getLiveItems();

const archivesAvailable = computed(() => archives.value?.length);
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-btn
        to="/"
        icon="mdi-arrow-left"
      ></v-btn>
      <v-toolbar-title>Select archive</v-toolbar-title>
    </v-toolbar>

    <ArchivesList v-if="archives" :archives="archives" />

    <p class="d-flex justify-center pt-10">
      <span v-if="archivesAvailable">Haven't found your archive?</span>
      <span v-else>No available information to preview. Please upload the archive with all the necessary data first.</span>
    </p>
    <div class="d-flex justify-center mt-3">
      <v-btn
        :to="{ name: 'home', query: { dialog: UPLOAD_DIALOG_QUERY } }"
        variant="outlined"
        color="primary"
      >
        <v-icon start>mdi-upload</v-icon>
        Upload new
      </v-btn>
    </div>
  </v-container>
</template>
