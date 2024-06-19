<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDropZone } from '@vueuse/core';
import { useApplicationTheme } from '@/composables/application-theme';

const emit = defineEmits(['upload']);

const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();
const inputUpdateKey = ref(0);
const acceptDataTypes = ['application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'multipart/x-zip'];

const applicationTheme = useApplicationTheme();
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: acceptDataTypes,
});

const dropzoneClasses = computed(() => {
  if (applicationTheme.isDark()) {
    return isOverDropZone.value ? 'bg-blue-grey-lighten-1' : 'bg-grey-darken-1';
  }
  return isOverDropZone.value ? 'bg-blue-grey-lighten-4' : 'bg-grey-lighten-4';
});
const dropzoneTextClasses = computed(() => applicationTheme.isDark() ? 'text-grey-lighten-4' : 'text-grey-darken-4');
const dropzoneIconColor = computed(() => applicationTheme.isDark() ? 'grey-lighten-3' : 'grey-darken-3');

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
    :class="dropzoneClasses"
    ref="dropZoneRef"
    class="upload-dropzone"
    @click="fileInputRef?.click()"
  >
    <v-icon size="60" :color="dropzoneIconColor">mdi-package-up</v-icon>
    <div :class="dropzoneTextClasses" class="mt-3">
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
