<script lang="ts" setup>
import { ref } from 'vue';
import { useDropZone } from '@vueuse/core';

const file = defineModel('file', {
  type: File,
  default: null,
});

const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();

function onDrop(files: File[] | null) {
  processFiles(files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'multipart/x-zip'],
});

function onFileInput(event: Event) {
  if (event?.target instanceof HTMLInputElement) {
    processFiles(event.target.files);
  }
}

function processFiles(inputFiles: FileList | File[] | null) {
  if (!inputFiles?.length) {
    return;
  }
  file.value = inputFiles[0];
}
</script>

<template>
  <div
    :class="isOverDropZone ? 'bg-blue-grey-lighten-3' : 'bg-grey-lighten-4'"
    ref="dropZoneRef"
    class="upload-dropzone"
    @click="fileInputRef?.click()"
  >
    <div v-if="file || isOverDropZone">
      Put files here
    </div>
    <div v-else>
      Click to select files from your computer
    </div>
  </div>
  <input
    v-show="false"
    ref="fileInputRef"
    type="file"
    accept=".zip"
    @input="onFileInput"
  >
</template>

<style scoped>
.upload-dropzone {
  cursor: pointer;
  height: 300px;
  border: 1px dashed grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
