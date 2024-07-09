<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useArchiveStorage } from '@/composables/archive-storage';
import ArchivesList from '@/components/archives/ArchivesList.vue';
import type { ArchiveItem } from '@/db/archives-db';

const show = defineModel('show', {
  type: Boolean,
  default: false,
});

const archiveId = inject('archiveId', -1);

const archiveStorage = useArchiveStorage();
const archives = archiveStorage.getLiveItems();
const availableArchives = computed(() => archives.value?.filter(a => a.id !== archiveId));

const selectedArchives = ref<ArchiveItem[]>([]);

const compareArchiveRoute = computed(() => {
  if (selectedArchives.value.length) {
    return { name: 'compare-archive', params: { compareId: selectedArchives.value[0].id } };
  }
  return undefined;
});

function close() {
  show.value = false;
}
</script>

<template>
  <v-dialog
    v-model="show"
    width="500"
    scrollable
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Compare archives</v-toolbar-title>
        <v-btn
          icon="mdi-close"
          class="mr-2"
          @click="close"
        ></v-btn>
      </v-toolbar>

      <v-card-text
        v-if="availableArchives"
        class="pt-2 px-1 px-sm-3"
      >
        <ArchivesList
          v-model:selected="selectedArchives"
          :archives="availableArchives"
          selectable
          show-id
        >
          <template #subheader>
            Select a comparison
          </template>

          <template #item-append="{ isActive }">
            <v-checkbox-btn :model-value="isActive" />
          </template>
        </ArchivesList>
      </v-card-text>
      <v-card-text v-else>
        <div class="text-center py-2">No archives available to compare</div>
        <div class="d-flex justify-center mt-1">
          <v-btn
            variant="outlined"
          >
            <v-icon start>mdi-upload</v-icon>
            Upload new
          </v-btn>
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn
          v-if="compareArchiveRoute"
          :to="compareArchiveRoute"
          variant="elevated"
          block
          color="primary"
        >
          Compare
        </v-btn>
        <v-btn
          v-else
          disabled
          block
          variant="elevated"
          color="primary"
        >
          Compare
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
