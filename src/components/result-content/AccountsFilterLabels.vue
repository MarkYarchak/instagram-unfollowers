<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useLabelsStore } from '@/stores/labels';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { AccountLabel } from '@/db/account-labels-db';

interface Props {
  items: ConnectionAccount[];
  search?: string;
}

const props = defineProps<Props>();
const archiveId = inject<number>('archiveId', -1);

const labelsStore = useLabelsStore();

const whitelistedCount = computed(() => findAccountsInLabels(labelsStore.whitelist).length);
const removedCount = computed(() => findAccountsInLabels(labelsStore.removedByArchive(archiveId)).length);
const anyFiltersApplied = computed(() => props.search || whitelistedCount.value || removedCount.value);

function findAccountsInLabels(labels: AccountLabel[]) {
  return props.items.filter(a => labels.some(l => l.username === a.username));
}
</script>

<template>
  <div v-if="anyFiltersApplied" class="d-flex ga-2 py-1">
    <v-chip
      v-if="search"
      label
      color="secondary"
      size="small"
    >
      <span class="text-truncate" style="max-width: 6rem;">search: {{ search }}</span>
    </v-chip>
    <v-chip
      v-if="whitelistedCount"
      :to="{ name: 'whitelist' }"
      label
      color="primary"
      size="small"
    >
      {{ whitelistedCount }} whitelisted
    </v-chip>
    <v-chip
      v-if="removedCount"
      :to="{ name: 'preview-result-trash' }"
      label
      color="red"
      size="small"
    >
      {{ removedCount }} removed
    </v-chip>
  </div>
</template>
