<script lang="ts" setup>
import { GITHUB_SOURCE_URL } from '@/constants/links'
import logoImage from '@/assets/images/throw-trash.png';
</script>

<template>
  <v-app-bar
    :extended="$vuetify.display.smAndDown"
    extension-height="140"
    color="black"
    class="px-4"
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

    <template v-if="$vuetify.display.smAndDown" #extension>
      <v-list width="100%" color="orange-accent-4" theme="dark">
        <v-list-item to="/">
          <v-list-item-media>
            <v-icon start>mdi-home</v-icon>
            Home
          </v-list-item-media>
        </v-list-item>
        <v-list-item to="/preview">
          <v-list-item-media>
            <v-icon start>mdi-eye</v-icon>
            Preview
          </v-list-item-media>
        </v-list-item>
      </v-list>
    </template>
  </v-app-bar>
</template>
