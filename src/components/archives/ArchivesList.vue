<script lang="ts" setup>
import { computed } from 'vue';
import { filesize } from 'filesize';
import { useArchiveStorage } from '@/composables/archive-storage';
import type { ArchiveItem } from '@/db/archives-db';

interface Props {
  archives: ArchiveItem[];
  showId?: boolean;
  selectable?: boolean;
}

const props = defineProps<Props>();

const selected = defineModel<ArchiveItem[]>();

const sortedArchives = computed(() => {
  const archives = [...props.archives];
  archives.sort((a: ArchiveItem, b: ArchiveItem) => b.uploadDate.getTime() - a.uploadDate.getTime());
  return archives;
});
const archiveStorage = useArchiveStorage();

function deleteFile(archive: ArchiveItem) {
  archiveStorage.deleteItem(archive.id);
}
</script>

<template>
  <v-list
    v-model:selected="selected"
    :selectable="selectable"
    select-strategy="single-leaf"
  >
    <v-list-subheader>
      <slot name="subheader">Recently uploaded</slot>
    </v-list-subheader>
    <v-list-item
      v-for="archive of sortedArchives"
      :key="archive.name"
      :to="selectable ? undefined : { name: 'preview-result', params: { archiveId: archive.id } }"
      :value="selectable ? archive : undefined"
      lines="two"
    >
      <template #prepend>
        <v-list-item-media start>
          <v-badge
            :model-value="showId"
            :content="'# ' + archive.id"
            location="bottom"
            bordered
          >
            <v-avatar color="grey-lighten-1">
              <v-icon color="white">mdi-package</v-icon>
            </v-avatar>
          </v-badge>
        </v-list-item-media>
      </template>

      <v-list-item-title>{{ archive.name }}</v-list-item-title>
      <v-list-item-subtitle>Uploaded {{ archive.uploadDate.toLocaleString() }}; Size {{ filesize(archive.file.size) }}</v-list-item-subtitle>

      <template #append="appendProps">
        <slot name="item-append" :item="archive" v-bind="appendProps">
          <v-list-item-action end>
            <v-btn
              v-if="$vuetify.display.mdAndUp"
              variant="flat"
              color="blue-grey-lighten-4"
              class="mr-3"
            >
              <v-icon start>mdi-file-find</v-icon>
              Open
            </v-btn>
            <v-btn
              variant="text"
              icon="mdi-delete"
              @click.prevent="deleteFile(archive)"
            ></v-btn>
          </v-list-item-action>
        </slot>
      </template>
    </v-list-item>

    <div v-if="!archives.length" class="text-center mt-5">
      No archives uploaded
    </div>
  </v-list>
</template>
