<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useInstagramConnections } from '@/composables/instagram-connections';
import { FOLLOWERS_AND_FOLLOWING_PATH } from '@/constants/sources';
import ConnectionAccountsList from '@/components/result-content/lists/ConnectionAccountsList.vue';
import type { UnarchivedEntries } from '@/composables/archive-reader';

interface Props {
  fileEntries: UnarchivedEntries;
  search?: string;
}

const props = defineProps<Props>();

const loading = ref<boolean>(false);
const tab = ref<string>();
const breadcrumbs = computed(() => FOLLOWERS_AND_FOLLOWING_PATH.split('/'));
const parsedFilesContent = ref();
const instagramConnections = useInstagramConnections();

const tabs = [
  {
    name: 'Not following back',
    listHeader: '$count people don\'t follow you back',
    accountConnectionsFn: instagramConnections.getNotFollowingBack,
  },
  {
    name: 'Not follow back',
    listHeader: 'You don\'t follow back $count people',
    accountConnectionsFn: instagramConnections.getNotFollowBack,
  },
  {
    name: 'Followers',
    listHeader: '$count people follow you',
    accountConnectionsFn: instagramConnections.getFollowers,
  },
  {
    name: 'Following',
    listHeader: '$count people follow you',
    accountConnectionsFn: instagramConnections.getFollowing,
  },
  {
    name: 'Recently unfollowed',
    listHeader: 'You have recently stopped following $count accounts',
    accountConnectionsFn: instagramConnections.getRecentlyUnfollowed,
  },
  {
    name: 'Recent follow requests',
    listHeader: 'You have recently sent $count follow requests that were either confirmed or deleted',
    accountConnectionsFn: instagramConnections.getRecentFollowRequests,
  },
  {
    name: 'Restricted accounts',
    listHeader: 'You have limited $count people',
    accountConnectionsFn: instagramConnections.getRestrictedAccounts,
  },
  {
    name: 'Blocked accounts',
    listHeader: 'You have blocked $count people',
    accountConnectionsFn: instagramConnections.getBlockedAccounts,
  },
];

loadContentFiles();

async function loadContentFiles() {
  loading.value = true;

  const instagramConnections = useInstagramConnections();
  parsedFilesContent.value = await instagramConnections.parseFollowersAndFollowing(props.fileEntries);

  loading.value = false;
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-alert
      v-if="!parsedFilesContent && !loading"
      type="warning"
      variant="tonal"
      border="start"
      class="mx-2"
    >
      <v-alert-title>Failed</v-alert-title>
      <div>Unable to read followers and unfollowers from your archive file</div>
    </v-alert>

    <v-tabs v-model="tab" show-arrows>
      <v-tab
        v-for="tab in tabs"
        :key="tab.name"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-window
      v-if="parsedFilesContent"
      v-model="tab"
    >
      <v-tabs-window-item
        v-for="tab in tabs"
        :key="tab.name"
      >
        <ConnectionAccountsList
          :content="parsedFilesContent"
          :search="search"
          :header="tab.listHeader"
          :account-connections-fn="tab.accountConnectionsFn"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
