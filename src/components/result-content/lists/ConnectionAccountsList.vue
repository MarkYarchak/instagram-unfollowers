<script setup lang="ts">
import { computed, watch } from 'vue';
import { useLazyList } from '@/composables/lazy-list';
import AccountsList from '@/components/result-content/lists/AccountsList.vue';
import AccountsFilterLabels from '@/components/result-content/AccountsFilterLabels.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { InfiniteScrollLoadOptions } from '@/constants/vuetify';

interface Props {
  search?: string;
  header?: string;
  items: ConnectionAccount[];
  selectable?: boolean;
  filter?: (account: ConnectionAccount) => boolean;
  useFilterLabels?: boolean;
}

const props = defineProps<Props>();
const selectedItems = defineModel<ConnectionAccount[]>('selectedItems');

const filteredItems = computed(() => props.filter ? props.items.filter(props.filter) : props.items);
const matchedItems = computed(matchItems);
const { lazyList, load } = useLazyList<ConnectionAccount>(matchedItems, { id: 'username' });

load();

const listHeader = computed(() => props.header && props.header.replace('$count', matchedItems.value.length.toString()));

watch(() => filteredItems.value.length, () => {
  if (selectedItems.value?.length && props.filter) {
    selectedItems.value = selectedItems.value?.filter(props.filter);
  }
});

function matchItems() {
  if (!props.search && !props.filter) {
    return filteredItems.value;
  }
  const getSearchField = (a: ConnectionAccount) => a.username || a.title || '';
  return filteredItems.value
    .filter((account) => props.search ? getSearchField(account).toLowerCase().includes(props.search.toLowerCase()) : true);
}

function onLoad({ done }: InfiniteScrollLoadOptions) {
  load();

  if (lazyList.value.length !== matchedItems.value.length) {
    return done('ok');
  }
  done('empty');
}
</script>

<template>
  <v-infinite-scroll
    margin="500"
    @load="onLoad"
  >
    <AccountsList
      v-model:selected-items="selectedItems"
      :items="lazyList"
      :selectable="selectable"
    >
      <template #subheader>
        <div class="mr-2">{{ listHeader }}</div>
        <AccountsFilterLabels
          v-if="useFilterLabels"
          :items="items"
          :search="search"
        />
        <span v-else-if="search" class="text-blue">(search applied)</span>
      </template>

      <template #item-subtitle="itemProps">
        <slot name="item-subtitle" v-bind="itemProps"></slot>
      </template>

      <template #item-actions="itemProps">
        <slot name="item-actions" v-bind="itemProps"></slot>
      </template>
    </AccountsList>

    <template #loading>
      Loading...
    </template>

    <template #empty>
      No more items
    </template>
  </v-infinite-scroll>
</template>
