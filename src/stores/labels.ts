import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useAccountsWhitelist } from '@/composables/account-labels/whitelist';
import { useRemovedAccountsStorage } from '@/composables/account-labels/removed';

const accountsWhitelist = useAccountsWhitelist();
const removedAccountsStorage = useRemovedAccountsStorage();

const whitelist = accountsWhitelist.getLiveItems();
const removed = removedAccountsStorage.getLiveItems();

export const useLabelsStore = defineStore('labels', () => {
  const removedByArchive = computed(() => (
    (archiveId: number) => removed.value.filter(l => l.archiveId === archiveId))
  );

  return {
    whitelist,
    removed,
    removedByArchive,
  };
});
