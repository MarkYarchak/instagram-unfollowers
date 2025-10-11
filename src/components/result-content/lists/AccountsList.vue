<script lang="ts" setup>
import AccountListItem from '@/components/result-content/lists/AccountListItem.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';

interface Props {
  subheader?: string;
  items: ConnectionAccount[];
  selectable?: boolean;
}

defineProps<Props>();

const selectedItems = defineModel<ConnectionAccount[]>('selectedItems');

function getItemValue(item: ConnectionAccount) {
  return item.username || item.title;
}
</script>

<template>
  <v-list
    v-model:selected="selectedItems"
    :selectable="selectable"
    select-strategy="classic"
  >
    <v-list-subheader v-if="subheader || $slots.subheader">
      <slot name="subheader">{{ subheader }}</slot>
    </v-list-subheader>

    <AccountListItem
      v-for="item of items"
      :key="getItemValue(item)"
      :account="item"
      :selectable="selectable"
    >
      <template #subtitle>
        <slot name="item-subtitle"></slot>
      </template>
      <template #actions>
        <slot name="item-actions"></slot>
      </template>
    </AccountListItem>
  </v-list>
</template>
