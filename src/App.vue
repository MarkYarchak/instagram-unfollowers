<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseAppBar from '@/components/BaseAppBar.vue';
</script>

<template>
  <v-app>
    <v-layout>
      <BaseAppBar />

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
