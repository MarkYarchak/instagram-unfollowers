import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLabelsStore } from '@/stores/labels';
import { useInstagramConnections } from '@/composables/instagram-connections';
import type { Ref, ComputedRef } from 'vue';
import type { AccountLabel } from '@/db/account-labels-db';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface LabeledAccount {
  label: AccountLabel;
  account: ConnectionAccount;
}

export function useWhitelistedLabeledAccounts(filesContent: ParsedFilesContent) {
  const labelsStore = useLabelsStore();
  const { whitelist } = storeToRefs(labelsStore);

  return createAPI(filesContent, whitelist);
}

export function useRemovedLabeledAccounts(filesContent: ParsedFilesContent, archiveId?: number) {
  const labelsStore = useLabelsStore();
  const { removed } = storeToRefs(labelsStore);
  const removedLabels = archiveId ? computed(() => labelsStore.removedByArchive(archiveId)) : removed;

  return createAPI(filesContent, removedLabels);
}

function createAPI(filesContent: ParsedFilesContent, labelsListRef: Ref<AccountLabel[]>) {
  const instagramConnections = useInstagramConnections();
  const liveItems = formatLabeledItems(labelsListRef);
  const accounts = computed(() => liveItems.value.map(i => i.account));

  function formatLabeledItems(labels: Ref<AccountLabel[]>) {
    const uniqAccountConnections = getUniqConnectionAccounts();

    return computed(() => labels.value.map((label) => {
      const account = uniqAccountConnections.find(a => a.username === label.username);
      return { label, account };
    })) as ComputedRef<LabeledAccount[]>;
  }

  function getUniqConnectionAccounts() {
    const followers = instagramConnections.getFollowers(filesContent);
    const following = instagramConnections.getFollowing(filesContent);
    const connectionAccounts = [...followers];

    for (const account of following) {
      if (followers.some(f => f.username === account.username)) {
        continue;
      }
      connectionAccounts.push(account);
    }
    return connectionAccounts;
  }

  function findAccountLabel(account: ConnectionAccount) {
    return liveItems.value.find(i => i.account?.username === account.username)?.label;
  }

  return {
    liveItems,
    accounts,
    findAccountLabel,
  };
}
