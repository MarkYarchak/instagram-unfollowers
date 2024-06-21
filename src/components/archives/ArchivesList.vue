<script lang="ts" setup>
import { computed } from 'vue';
import { filesize } from 'filesize';
import { useArchiveStorage } from '@/composables/archive-storage';
import type { ArchiveItem } from '@/db/archives-db';

interface Props {
  archives: ArchiveItem[];
}

const props = defineProps<Props>();

const sortedArchives = computed(() => {
  return props.archives.toSorted((a: ArchiveItem, b: ArchiveItem) => b.uploadDate.getTime() - a.uploadDate.getTime());
});
const archiveStorage = useArchiveStorage();

function deleteFile(archive: ArchiveItem) {
  archiveStorage.deleteItem(archive.id);
}
</script>

<template>
  <v-list>
    <v-list-subheader>Recently uploaded</v-list-subheader>
    <v-list-item
      v-for="archive of sortedArchives"
      :key="archive.name"
    >
      <template #prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-package</v-icon>
        </v-avatar>
      </template>

      <v-list-item-title>{{ archive.name }}</v-list-item-title>
      <v-list-item-subtitle>Uploaded {{ archive.uploadDate.toLocaleString() }}; Size {{ filesize(archive.file.size) }}</v-list-item-subtitle>

      <template #append>
        <v-list-item-action>
          <v-btn
            :to="{ name: 'preview-result', params: { archiveId: archive.id } }"
            variant="elevated"
            color="primary"
            class="mr-3"
          >
            Preview
          </v-btn>
          <v-btn
            variant="text"
            icon="mdi-delete"
            @click="deleteFile(archive)"
          ></v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>

    <div v-if="!archives.length" class="text-center mt-5">
      No archives uploaded
    </div>
  </v-list>
</template>
