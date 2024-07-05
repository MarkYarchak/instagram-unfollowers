<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useLabelsStore } from '@/stores/labels';
import { useAccountsWhitelist } from '@/composables/account-labels/whitelist';
import WhitelistLabels from '@/components/labels/WhitelistLabels.vue';
import type { AccountLabel } from '@/db/account-labels-db';

const SearchFiled = defineAsyncComponent(() => import('@/components/SearchFiled.vue'));

type UniqArchiveIds = string[];

const labelsStore = useLabelsStore();

const inputValue = ref<string>('');
const selectedArchives = ref<UniqArchiveIds>([]);

const canAdd = computed(() => inputValue.value && !labelsStore.whitelist.some(l => l.username === inputValue.value));
const involvedArchiveIds = computed<UniqArchiveIds>(findInvolvedArchiveIds);

function findInvolvedArchiveIds() {
  return labelsStore.whitelist.reduce<UniqArchiveIds>((uniqArchiveIds, label) => {
    const { archiveId } = label;
    const newValue = String(archiveId ?? undefined);
    if (!uniqArchiveIds.includes(newValue)) {
      uniqArchiveIds.push(newValue);
    }
    return uniqArchiveIds;
  }, []);
}

function labelFilter(label: AccountLabel) {
  const selectedArchivesCount = selectedArchives.value.length;
  const search = inputValue.value?.toLowerCase();
  const archiveKey = generateArchiveKey(label.archiveId);
  const archiveFilter = () => selectedArchives.value.includes(archiveKey);
  const searchFilter = () => label.username.includes(search);

  if (!selectedArchivesCount && !search) {
    return true;
  }
  if (selectedArchivesCount && search) {
    return archiveFilter() && searchFilter();
  }
  if (selectedArchivesCount) {
    return archiveFilter();
  }
  return searchFilter();
}

function generateArchiveKey(archiveId: string | number | undefined) {
  return String(archiveId);
}

const accountsWhitelist = useAccountsWhitelist();

async function addItem() {
  await accountsWhitelist.addNoArchiveItem(inputValue.value);
  inputValue.value = '';
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <h1>Whitelist</h1>
      <v-spacer />
      <v-btn
        to="/preview"
        color="primary"
      >
        <v-icon start>mdi-file-find</v-icon>
        Preview
      </v-btn>
    </div>

    <v-form @submit.prevent="addItem">
      <div class="d-flex align-center">
        <SearchFiled
          v-model="inputValue"
          variant="filled"
          destiny="compact"
          label="Type username"
          clearable
        />

        <v-btn
          :disabled="!canAdd"
          :color="canAdd ? 'blue-grey-darken-4' : undefined"
          type="submit"
          icon="mdi-plus"
          class="ml-2"
        ></v-btn>
      </div>
    </v-form>

    <v-chip-group
      v-if="involvedArchiveIds.length"
      v-model="selectedArchives"
      column
      multiple
      color="primary"
      class="mt-3"
    >
      <v-chip
        v-for="archive of involvedArchiveIds"
        :key="generateArchiveKey(archive)"
        :text="isNaN(Number(archive)) ? 'No archive' : `Archive ${archive}`"
        :value="generateArchiveKey(archive)"
        variant="outlined"
        filter
      ></v-chip>
    </v-chip-group>
    <WhitelistLabels
      :search="inputValue"
      :filter="labelFilter"
    />
  </v-container>
</template>
