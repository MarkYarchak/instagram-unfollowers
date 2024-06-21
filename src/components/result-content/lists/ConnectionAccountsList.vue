<script setup lang="ts">
import { computed, ref } from 'vue';
import AccountsList from '@/components/result-content/lists/AccountsList.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { ParsedFilesContent } from '@/composables/instagram-connections';

interface Props {
  content: ParsedFilesContent,
  search?: string;
  header?: string;
  accountConnectionsFn: (filesContent: ParsedFilesContent) => ConnectionAccount[];
}

const props = defineProps<Props>();

const items = computed(() => {
  const connectionItems = props.accountConnectionsFn(props.content);

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

  const loadCount = 40;
  const sliceEndIndex = Math.min(loadedItemsCount + loadCount, items.value.length);
  const newItemsPart = items.value.slice(loadedItemsCount, sliceEndIndex);

  lazyList.value.push(...newItemsPart);
}

function onIntersect(isIntersected: boolean) {
  if (!isIntersected) {
    return;
  }
  if (lazyList.value.length !== items.value.length) {
    load();
  }
}
</script>

<template>
  <AccountsList :items="lazyList">
    <template #subheader>
      <span>{{ listHeader }}</span>
      <span v-if="search" class="text-blue ml-2">(search applied)</span>
    </template>
  </AccountsList>
  <template v-if="lazyList.length !== items.length">
    <v-divider v-if="$vuetify.theme.current.dark" />
    <v-sheet
      v-intersect="{
      handler: onIntersect,
        options: {
          marginRoot: '500px',
        },
      }"
      class="text-center py-3"
    >
      Loading...
    </v-sheet>
  </template>
</template>
