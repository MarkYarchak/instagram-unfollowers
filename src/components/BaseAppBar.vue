<script lang="ts" setup>
import { GITHUB_SOURCE_URL } from '@/constants/links'
import logoImage from '@/assets/images/throw-trash.png';
</script>

<template>
  <v-app-bar
    color="black"
    class="position-fixed px-4"
  >
    <v-avatar tile>
      <v-img :src="logoImage" />
    </v-avatar>
    <v-toolbar-title class="font-weight-bold">
      Instagram<br />
      Unfollowers
    </v-toolbar-title>

    <v-toolbar-items v-if="$vuetify.display.mdAndUp">
      <v-btn
        exact
        to="/"
      >
        <v-icon start>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn
        exact
        to="/preview"
      >
        <v-icon start>mdi-eye</v-icon>
        Preview
      </v-btn>
    </v-toolbar-items>

    <v-btn
      :href="GITHUB_SOURCE_URL"
      target="_blank"
      icon="mdi-github"
      class="ml-3"
    ></v-btn>
  </v-app-bar>
</template>
