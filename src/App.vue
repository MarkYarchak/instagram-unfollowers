<script setup lang="ts">
import BaseAppBar from '@/components/BaseAppBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
</script>

<template>
  <v-app>
    <BaseAppBar />

    <v-main>
      <router-view />
    </v-main>

    <BaseFooter />
  </v-app>
</template>
