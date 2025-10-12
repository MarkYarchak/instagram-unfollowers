<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useWhitelistedLabeledAccounts, useRemovedLabeledAccounts } from '@/composables/account-labels/labeled-accounts';
import { useInstagramConnections } from '@/composables/instagram-connections';
import { FOLLOWERS_AND_FOLLOWING_PATH } from '@/constants/sources';
import ConnectionAccountsList from '@/components/result-content/lists/ConnectionAccountsList.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface Props {
  filesContent: ParsedFilesContent;
  search?: string;
}

const props = defineProps<Props>();

const archiveId = inject<number>('archiveId', -1);

const selectedItems = defineModel<ConnectionAccount[]>('selectedItems');

const activeTab = ref<string|number>();
const breadcrumbs = computed(() => FOLLOWERS_AND_FOLLOWING_PATH.split('/'));
const instagramConnections = useInstagramConnections();

const whitelistedLabeledAccounts = useWhitelistedLabeledAccounts(props.filesContent);
const removedLabeledAccounts = useRemovedLabeledAccounts(props.filesContent, archiveId);

const tabs = [
  {
    name: 'Not following back',
    listHeader: '$count people don\'t follow you back',
    accountConnectionsFn: instagramConnections.getNotFollowingBack,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Not follow back',
    listHeader: 'You don\'t follow back $count people',
    accountConnectionsFn: instagramConnections.getNotFollowBack,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Followers',
    listHeader: '$count people follow you',
    accountConnectionsFn: instagramConnections.getFollowers,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Following',
    listHeader: 'You follow $count people',
    accountConnectionsFn: instagramConnections.getFollowing,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Recently unfollowed',
    listHeader: 'You have recently stopped following $count accounts',
    accountConnectionsFn: instagramConnections.getRecentlyUnfollowed,
    selectableList: false,
  },
  {
    name: 'Recent follow requests',
    listHeader: 'You have recently sent $count follow requests that were either confirmed or deleted',
    accountConnectionsFn: instagramConnections.getRecentFollowRequests,
    selectableList: false,
  },
  {
    name: 'Restricted accounts',
    listHeader: 'You have limited $count people',
    accountConnectionsFn: instagramConnections.getRestrictedAccounts,
    selectableList: false,
  },
  {
    name: 'Blocked accounts',
    listHeader: 'You have blocked $count people',
    accountConnectionsFn: instagramConnections.getBlockedAccounts,
    selectableList: false,
  },
];

function filterWhitelistedAndRemoved(account: ConnectionAccount) {
  const isWhitelisted = whitelistedLabeledAccounts.hasLabel(account);
  const isRemoved = removedLabeledAccounts.hasLabel(account);

  return !isWhitelisted && !isRemoved;
}
</script>

<template>
  <div class="pb-3">
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-tabs
      v-model="activeTab"
      :disabled="!!selectedItems?.length"
      show-arrows
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item
        v-for="tab in tabs"
        :key="tab.name"
      >
        <ConnectionAccountsList
          v-model:selected-items="selectedItems"
          :key="search"
          :content="filesContent"
          :search="search"
          :header="tab.listHeader"
          :account-connections-fn="tab.accountConnectionsFn"
          :selectable="tab.selectableList"
          :filter="tab.filter"
          use-filter-labels
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
