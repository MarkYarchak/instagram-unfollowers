<script lang="ts" setup>
import { reactive } from 'vue';
import { filesize } from 'filesize';
import UploadArchive from '@/components/UploadArchive.vue';

const show = defineModel('show', {
  type: Boolean,
  default: false,
});

const files = reactive<Array<File>>([]);

function onUpload(file: File) {
  if (!file) {
    return;
  }

  files.push(file);
}

function canPreviewFile(file: File) {
  return !!file;
}

function deleteFile(file: File) {
  const index = files.findIndex(f => f.name === file.name);
  if (index !== -1) {
    files.splice(index, 1);
  }
}

function close() {
  show.value = false;
}
</script>

<template>
  <v-dialog
    v-model="show"
    fullscreen
    scrollable
    transition="slide-y-reverse-transition"
  >
    <v-card>
      <v-toolbar elevation="3">
        <v-btn
          icon="mdi-close"
          @click="close"
        ></v-btn>
        <v-toolbar-title>Upload data archive</v-toolbar-title>
      </v-toolbar>

      <v-container class="px-0">
        <v-card-item>
          <UploadArchive @update:file="onUpload" />
        </v-card-item>

        <v-card-item>
          <v-list>
            <v-list-subheader>Recently uploaded</v-list-subheader>
            <v-list-item
              v-for="file of files"
              :key="file.name"
            >
              <template #prepend>
                <v-avatar color="grey-lighten-1">
                  <v-icon color="white">mdi-package</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title>{{ file.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ filesize(file.size) }}</v-list-item-subtitle>

              <template #append>
                <v-list-item-action>
                  <v-btn
                    :disabled="!canPreviewFile(file)"
                    variant="outlined"
                    color="primary"
                    class="mr-3"
                  >
                    Preview
                  </v-btn>
                  <v-btn
                    :disabled="!canPreviewFile(file)"
                    variant="text"
                    icon="mdi-delete"
                    @click="deleteFile(file)"
                  ></v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-container>
    </v-card>
  </v-dialog>
</template>
