<script lang="ts" setup>
import { GITHUB_SOURCE_URL } from '@/constants/links';

defineProps({
  size: {
    type: String,
    default: 'small',
  },
});
</script>

<template>
  <v-btn
    :href="GITHUB_SOURCE_URL"
    :size="size"
    target="_blank"
    variant="tonal"
  >
    <v-icon start>mdi-github</v-icon>
    <slot></slot>
  </v-btn>
</template>
