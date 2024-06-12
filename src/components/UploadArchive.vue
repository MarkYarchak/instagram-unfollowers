<script lang="ts" setup>
import { ref } from 'vue';
import { useDropZone } from '@vueuse/core';

const emit = defineEmits(['upload']);

const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();
const inputUpdateKey = ref(0);
const acceptDataTypes = ['application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'multipart/x-zip'];

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: acceptDataTypes,
});

function onFileInput(event: Event) {
  if (event?.target instanceof HTMLInputElement) {
    processFiles(event.target.files);
  }
}

function onDrop(files: File[] | null) {
  processFiles(files);
}

function processFiles(inputFiles: FileList | File[] | null) {
  if (!inputFiles?.length) {
    return;
  }
  emit('upload', inputFiles[0]);
  inputUpdateKey.value++;
}
</script>

<template>
  <div
    :class="isOverDropZone ? 'bg-blue-grey-lighten-4' : 'bg-grey-lighten-4'"
    ref="dropZoneRef"
    class="upload-dropzone"
    @click="fileInputRef?.click()"
  >
    <v-icon size="60" color="grey-darken-3">mdi-package-up</v-icon>
    <div class="text-grey-darken-4 mt-3">
      <span v-if="isOverDropZone">Put files here</span>
      <span v-else>Click to select files from your computer</span>
    </div>
  </div>
  <input
    v-show="false"
    ref="fileInputRef"
    :key="inputUpdateKey"
    :accept="acceptDataTypes.join(', ')"
    type="file"
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
