<script lang="ts" setup>
import { inject } from 'vue';
import { useRemovedLabeledAccounts } from '@/composables/account-labels/labeled-accounts';
import { useRemovedAccountsStorage } from '@/composables/account-labels/removed';
import ConnectionAccountsList from '@/components/result-content/lists/ConnectionAccountsList.vue';
import type { ConnectionAccount, ConnectionsData } from '@/composables/instagram-connections';

interface Props {
  connectionsData: ConnectionsData;
}

const props = defineProps<Props>();

const archiveId = inject<number>('archiveId');

if (!archiveId) {
  throw new Error('archiveId is required to provide');
}

const listHeader = 'You have removed $count item(s) in this archive';

const { accounts: removedConnectionAccounts, findAccountLabel } = useRemovedLabeledAccounts(props.connectionsData, archiveId);

function formatItemSubtitle(account: ConnectionAccount) {
  const label = findAccountLabel(account);
  if (label) {
    return `Removed ${label.createDate.toLocaleString()}`;
  }
}

const removedAccountsStorage = useRemovedAccountsStorage();

function deleteLabel(account: ConnectionAccount) {
  const label = findAccountLabel(account);
  if (label) {
    removedAccountsStorage.deleteItem(label);
  }
}
</script>

<template>
  <ConnectionAccountsList
    :header="listHeader"
    :items="removedConnectionAccounts"
  >
    <template #item-subtitle="{ item }">
      {{ formatItemSubtitle(item) }}
    </template>

    <template #item-actions="{ item }">
      <v-btn
        variant="flat"
        icon="mdi-close"
        @click="deleteLabel(item)"
      ></v-btn>
    </template>
  </ConnectionAccountsList>
</template>
