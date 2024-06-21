<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { objectOmit } from '@vueuse/core';
import { useArchiveStorage } from '@/composables/archive-storage';
import UploadArchive from '@/components/archives/UploadArchive.vue';
import ArchivesList from '@/components/archives/ArchivesList.vue';

const show = defineModel('show', {
  type: Boolean,
  default: false,
});
const route = useRoute();
const router = useRouter();

const archiveStorage = useArchiveStorage();
const archives = archiveStorage.getLiveItems();

const showAlertSnackbar = ref(false);
const alertSnackbarText = ref('');

async function onUpload(file: File) {
  if (!file) {
    return false;
  }

  archiveStorage
    .addItem(file)
    .catch(err => showAlert(err.message));
}

function showAlert(text: string) {
  alertSnackbarText.value = text;
  showAlertSnackbar.value = true;
}

function onDialogInput(open: boolean) {
  if (!open) {
    updateRouteNoDialog();
  }
}

function close() {
  show.value = false;
  updateRouteNoDialog();
}

function updateRouteNoDialog() {
  const noDialogQuery = objectOmit(route.query, ['dialog']);
  const updatedRoute = { ...route, query: noDialogQuery };
  router.replace(updatedRoute);
}
</script>

<template>
  <v-dialog
    v-model="show"
    fullscreen
    scrollable
    @update:model-value="onDialogInput"
  >
    <v-card>
      <v-toolbar elevation="3">
        <v-btn
          icon="mdi-close"
          @click="close"
        ></v-btn>
        <v-toolbar-title>Upload data archive</v-toolbar-title>
      </v-toolbar>

      <v-container>
        <UploadArchive @upload="onUpload" />
        <ArchivesList v-if="archives" :archives="archives" />
      </v-container>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="showAlertSnackbar"
    multi-line
  >
    {{ alertSnackbarText }}

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        @click="showAlertSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
