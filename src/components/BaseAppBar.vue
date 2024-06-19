<script lang="ts" setup>
import { useApplicationTheme } from '@/composables/application-theme';
import { GITHUB_SOURCE_URL } from '@/constants/links';
import logoImage from '@/assets/images/throw-trash.png';

const applicationTheme = useApplicationTheme();

function toggleTheme() {
  applicationTheme.toggle();
}
</script>

<template>
  <v-app-bar
    color="black"
    class="position-fixed px-4"
  >
    <v-toolbar-title>
      <router-link
        to="/"
        class="d-inline-flex align-center text-decoration-none"
      >
        <v-avatar tile>
          <v-img :src="logoImage" />
        </v-avatar>
        <div class="text-white font-weight-bold ml-3">
          Instagram<br />
          Unfollowers
        </div>
      </router-link>
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
      icon="mdi-theme-light-dark"
      class="ml-3"
      @click="toggleTheme"
    ></v-btn>

    <v-btn
      :href="GITHUB_SOURCE_URL"
      target="_blank"
      icon="mdi-github"
      class="ml-3"
    ></v-btn>
  </v-app-bar>
</template>
