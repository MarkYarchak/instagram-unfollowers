<script setup lang="ts">
import { computed, ref } from 'vue';
import AccountsList from '@/components/result-content/lists/AccountsList.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

interface Props {
  content: ParsedFilesContent,
  search?: string;
  header?: string;
  accountConnectionsFn: (filesContent: ParsedFilesContent) => ConnectionAccount[];
}

const props = defineProps<Props>();

const items = computed(() => {
  const connectionItems = props.accountConnectionsFn(props.content);

  if (!connectionItems) {
    return [];
  }
  if (!props.search) {
    return connectionItems;
  }
  const getSearchField = (a: ConnectionAccount) => a.username || a.title || '';
  return connectionItems.filter((account) => getSearchField(account).toLowerCase().includes(props.search!.toLowerCase()));
});
const lazyList = ref<Array<ConnectionAccount>>([]);
const listHeader = computed(() => props.header && props.header.replace('$count', items.value.length.toString()));

load();

function load() {
  const loadedItemsCount = lazyList.value.length;
  if (loadedItemsCount === items.value.length) {
    return;
  }

  const loadCount = 20;
  const sliceEndIndex = Math.min(loadedItemsCount + loadCount, items.value.length);
  const newItemsPart = items.value.slice(loadedItemsCount, sliceEndIndex);

  lazyList.value.push(...newItemsPart);
}

function onLoad({ done }: { done: (status: InfiniteScrollStatus) => any }) {
  load();

  if (lazyList.value.length !== items.value.length) {
    return done('ok');
  }
  done('empty');
}
</script>

<template>
  <v-infinite-scroll @load="onLoad">
    <AccountsList :items="lazyList">
      <template #subheader>
        <span>{{ listHeader }}</span>
        <span v-if="search" class="text-blue ml-2">(search applied)</span>
      </template>
    </AccountsList>

    <template v-slot:loading>
      Loading...
    </template>

    <template v-slot:empty>
      No more items
    </template>
  </v-infinite-scroll>
</template>
