<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { FOLLOWERS_AND_FOLLOWING_PATH } from '@/constants/sources';
import type { UnarchivedEntries } from '@/composables/archive-reader';
import type { ZipEntry } from 'unzipit';

interface Props {
  fileEntries: UnarchivedEntries;
  search?: string;
}

const props = defineProps<Props>();

const tab = ref<string>();
const contentFiles = reactive<{ [k: string]: string }>({});

const followersAndFollowingEntries = computed(() => {
  const entries = Object.entries(props.fileEntries);
  return entries
    .filter(e => e[0].startsWith(FOLLOWERS_AND_FOLLOWING_PATH) && e[0] !== `${FOLLOWERS_AND_FOLLOWING_PATH}/`)
    .map(e => [e[0].slice(FOLLOWERS_AND_FOLLOWING_PATH.length + 1), e[1]] as [string, ZipEntry]);
});
const breadcrumbs = computed(() => FOLLOWERS_AND_FOLLOWING_PATH.split('/'));

loadContentFiles();

function loadContentFiles() {
  for (const [name, content] of followersAndFollowingEntries.value) {
    content
      .text()
      .then(res => (contentFiles[name] = res));
  }
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-alert
      v-if="!followersAndFollowingEntries.length"
      type="warning"
      variant="tonal"
      border="start"
      class="mx-2"
    >
      <v-alert-title>Failed</v-alert-title>
      <div>Unable to read followers and unfollowers from your archive file</div>
    </v-alert>

    <v-tabs v-model="tab">
      <v-tab
        v-for="[tab] in followersAndFollowingEntries"
        :key="tab"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="[tab] in followersAndFollowingEntries"
        :key="tab"
      >
        <pre>{{ contentFiles[tab] }}</pre>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
