<script lang="ts" setup>
import { INSTAGRAM_PERSONAL_DOWNLOAD_LINK } from '@/constants/sources';
</script>

<template>
  <v-btn
    :href="INSTAGRAM_PERSONAL_DOWNLOAD_LINK"
    target="_blank"
    size="x-small"
    color="primary"
    variant="tonal"
  >
    <v-icon start>mdi-open-in-new</v-icon>
    <slot></slot>
  </v-btn>
</template>
