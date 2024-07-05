<script lang="ts" setup>
import AccountItemMenu from '@/components/result-content/lists/AccountItemMenu.vue';
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

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
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

    <v-list-item
      v-for="item of items"
      :key="getItemValue(item)"
      :value="selectable ? item : null"
    >
      <template v-if="selectable" #prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title>{{ getItemValue(item) }}</v-list-item-title>
      <v-list-item-subtitle v-if="item.timestamp || $slots['item-subtitle']?.length">
        <slot name="item-subtitle" :item="item">
          {{ formatTimestamp(item.timestamp) }}
        </slot>
      </v-list-item-subtitle>

      <template #append>
        <v-list-item-action end>
          <v-btn
            :href="item.href"
            target="_blank"
            variant="flat"
            color="blue-grey-lighten-4"
            class="mr-3"
          >
            <v-icon :start="$vuetify.display.smAndUp">mdi-instagram</v-icon>
            <span v-if="$vuetify.display.smAndUp">Open</span>
          </v-btn>
          <AccountItemMenu v-if="selectable" :item="item">
            <template #activator="{ props }">
              <v-btn
                variant="text"
                icon="mdi-dots-vertical"
                v-bind="props"
              ></v-btn>
            </template>
          </AccountItemMenu>

          <slot name="item-actions" :item="item"></slot>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>
