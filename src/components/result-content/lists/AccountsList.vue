<script lang="ts" setup>
import type { ConnectionAccount } from '@/composables/instagram-connections';

interface Props {
  subheader?: string;
  items: Array<ConnectionAccount>;
}

defineProps<Props>();

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}
</script>

<template>
  <v-list>
    <v-list-subheader v-if="subheader || $slots.subheader">
      <slot name="subheader">{{ subheader }}</slot>
    </v-list-subheader>

    <v-list-item
      v-for="item of items"
      :key="item.username"
      :href="item.href"
      target="_blank"
    >
      <v-list-item-title>{{ item.username || item.title }}</v-list-item-title>
      <v-list-item-subtitle v-if="item.timestamp">
        {{ formatTimestamp(item.timestamp) }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
