<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseAppBar from '@/components/BaseAppBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
</script>

<template>
  <v-app>
    <v-layout>
      <BaseAppBar />

      <v-main>
        <RouterView />
      </v-main>

      <BaseFooter />
    </v-layout>
  </v-app>
</template>
