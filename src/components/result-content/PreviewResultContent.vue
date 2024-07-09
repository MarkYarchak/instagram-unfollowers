<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useLabelsStore } from '@/stores/labels';
import { FOLLOWERS_AND_FOLLOWING_PATH } from '@/constants/sources';
import ConnectionAccountsList from '@/components/result-content/lists/ConnectionAccountsList.vue';
import type { ConnectionAccount, ConnectionsData } from '@/composables/instagram-connections';
import type { AccountLabel } from '@/db/account-labels-db';

interface Props {
  connectionsData: ConnectionsData;
  search?: string;
}

const props = defineProps<Props>();

const archiveId = inject<number>('archiveId', -1);

const selectedItems = defineModel<ConnectionAccount[]>('selectedItems');

const activeTab = ref<string|number>();
const breadcrumbs = computed(() => FOLLOWERS_AND_FOLLOWING_PATH.split('/'));

const labelsStore = useLabelsStore();

const tabs = [
  {
    name: 'Not following back',
    listHeader: '$count people don\'t follow you back',
    items: props.connectionsData.notFollowingBack,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Not follow back',
    listHeader: 'You don\'t follow back $count people',
    items: props.connectionsData.notFollowBack,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Followers',
    listHeader: '$count people follow you',
    items: props.connectionsData.followers,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Following',
    listHeader: 'You follow $count people',
    items: props.connectionsData.following,
    selectableList: true,
    filter: filterWhitelistedAndRemoved,
  },
  {
    name: 'Recently unfollowed',
    listHeader: 'You have recently stopped following $count accounts',
    items: props.connectionsData.recentlyUnfollowed,
    selectableList: false,
  },
  {
    name: 'Recent follow requests',
    listHeader: 'You have recently sent $count follow requests that were either confirmed or deleted',
    items: props.connectionsData.recentFollowRequests,
    selectableList: false,
  },
  {
    name: 'Restricted accounts',
    listHeader: 'You have limited $count people',
    items: props.connectionsData.restrictedAccounts,
    selectableList: false,
  },
  {
    name: 'Blocked accounts',
    listHeader: 'You have blocked $count people',
    items: props.connectionsData.blockedAccounts,
    selectableList: false,
  },
];

function filterWhitelistedAndRemoved(account: ConnectionAccount) {
  const isLabeledUsername = (label: AccountLabel) => label.username === account.username;
  const isWhitelisted = labelsStore.whitelist.some(isLabeledUsername);
  const isRemoved = labelsStore.removedByArchive(archiveId).some(isLabeledUsername);

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
          :items="tab.items"
          :search="search"
          :header="tab.listHeader"
          :selectable="tab.selectableList"
          :filter="tab.filter"
          use-filter-labels
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
