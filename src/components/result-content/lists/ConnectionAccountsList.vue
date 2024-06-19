<script setup lang="ts">
import { computed } from 'vue';
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

const connectionsList = props.accountConnectionsFn(props.content);

const items = computed(computeSearchItems);
const listHeader = computed(() => {
  if (!props.header) {
    return undefined;
  }
  return props.header.replace('$count', items.value.length.toString())
});

function computeSearchItems() {
  if (!props.search) {
    return connectionsList;
  }
  const getSearchField = (a: ConnectionAccount) => a.username || a.title || '';
  return connectionsList.filter((account) => getSearchField(account).toLowerCase().includes(props.search.toLowerCase()));
}
</script>

<template>
  <AccountsList :subheader="listHeader" :items="items" />
</template>
