<script lang="ts" setup>
import { getAccountUsername } from '@/helpers/accounts';
import AccountListItem from '@/components/result-content/lists/AccountListItem.vue';
import type { ConnectionAccount } from '@/composables/instagram-connections';

interface Props {
  subheader?: string;
  items: ConnectionAccount[];
  selectable?: boolean;
}

defineProps<Props>();

const selectedItems = defineModel<ConnectionAccount[]>('selectedItems');
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
      :key="getAccountUsername(item)"
      :account="item"
      :selectable="selectable"
    >
      <template #subtitle="itemProps">
        <slot name="item-subtitle" v-bind="itemProps"></slot>
      </template>
      <template #actions="itemProps">
        <slot name="item-actions" v-bind="itemProps"></slot>
      </template>
    </AccountListItem>
  </v-list>
</template>
