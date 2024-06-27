<script lang="ts" setup>
interface Props {
  href: string;
}

defineProps<Props>();
</script>

<template>
  <v-btn
    :href="href"
    target="_blank"
    size="x-small"
    color="primary"
    variant="tonal"
    class="text-none"
  >
    <slot></slot>
    <v-icon end>mdi-open-in-new</v-icon>
  </v-btn>
</template>
