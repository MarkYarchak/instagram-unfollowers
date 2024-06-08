<script lang="ts" setup>
import { GITHUB_SOURCE_URL } from '@/constants/links'
</script>

<template>
  <v-app-bar>
    <v-toolbar-title class="font-weight-bold">Unfollowers</v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        exact
        to="/"
      >
        Home
      </v-btn>
      <v-btn
        exact
        to="/preview"
      >
        Preview
      </v-btn>
    </v-toolbar-items>

    <v-btn
      :href="GITHUB_SOURCE_URL"
      target="_blank"
      icon="mdi-github"
    ></v-btn>
  </v-app-bar>
</template>
