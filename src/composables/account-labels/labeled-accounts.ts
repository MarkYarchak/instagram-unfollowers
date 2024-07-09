import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLabelsStore } from '@/stores/labels';
import type { Ref, ComputedRef } from 'vue';
import type { AccountLabel } from '@/db/account-labels-db';
import type { ConnectionAccount, ConnectionsData } from '@/composables/instagram-connections';

interface LabeledAccount {
  label: AccountLabel;
  account: ConnectionAccount;
}

export function useWhitelistedLabeledAccounts(connectionsData: ConnectionsData) {
  const labelsStore = useLabelsStore();
  const { whitelist } = storeToRefs(labelsStore);

  return createAPI(connectionsData, whitelist);
}

export function useRemovedLabeledAccounts(connectionsData: ConnectionsData, archiveId?: number) {
  const labelsStore = useLabelsStore();
  const { removed } = storeToRefs(labelsStore);
  const removedLabels = archiveId ? computed(() => labelsStore.removedByArchive(archiveId)) : removed;

  return createAPI(connectionsData, removedLabels);
}

function createAPI(connectionsData: ConnectionsData, labelsListRef: Ref<AccountLabel[]>) {
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
    const { followers, following } = connectionsData;
    const connectionAccounts = [...connectionsData.followers];

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
