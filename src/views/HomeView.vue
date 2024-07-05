<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UPLOAD_DIALOG_QUERY } from '@/constants/drawers';
import { INSTAGRAM_PERSONAL_DOWNLOAD_LINK } from '@/constants/sources';
import FAQSection from '@/components/FAQSection.vue';
import UploadArchiveDialog from '@/components/archives/UploadArchiveDialog.vue';

const route = useRoute();
const router = useRouter();

const showUploadDialog = computed({
  get() {
    return route.query.dialog === UPLOAD_DIALOG_QUERY;
  },
  set(show) {
    const query = {
      ...route.query,
      dialog: show ? UPLOAD_DIALOG_QUERY : undefined,
    };

    router.push({ query, force: true });
  },
});

const guideSteps = [
  {
    title: '1. Fetch data',
    description: 'Download your archive with information in JSON format from Instagram',
    action: {
      title: 'Open Instagram',
      icon: 'mdi-open-in-new',
      href: INSTAGRAM_PERSONAL_DOWNLOAD_LINK,
    },
  },
  {
    title: '2. Upload data',
    description: 'Select the downloaded archive from your device or put it into the specified area',
    action: {
      title: 'Upload',
      icon: 'mdi-upload',
      onClick: openUploadDialog,
    },
  },
  {
    title: '3. Get the result',
    description: 'The result will be processed automatically once you will open the archive to preview',
    action: {
      title: 'Preview',
      icon: 'mdi-file-find',
      to: '/preview',
    },
  },
];

function openUploadDialog() {
  showUploadDialog.value = true;
}
</script>

<template>
  <v-container>
    <h1>Instagram Unfollowers</h1>
    <p>Check your unfollowers without sharing any personal account data</p>

    <h2 class="mt-10 mb-3">How to get started</h2>
    <v-row>
      <v-col
        v-for="step of guideSteps"
        :key="step.title"
        cols="12"
        md="4"
      >
        <v-card
          width="100%"
          height="100%"
        >
          <v-card-title>{{ step.title }}</v-card-title>
          <v-card-text>{{ step.description }}</v-card-text>
          <v-card-actions v-if="step.action">
            <v-btn
              :href="step.action.href"
              :to="step.action.to"
              :target="step.action.href ? '_blank' : ''"
              block
              variant="elevated"
              color="primary"
              @click="step.action.onClick ? step.action.onClick() : null"
            >
              <v-icon start>{{ step.action.icon }}</v-icon>
              {{ step.action.title }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert
      type="info"
      border="top"
      variant="tonal"
      class="mt-10"
    >
      <v-alert-title>Create accounts whitelist</v-alert-title>
      <div>Use new feature to filter the accounts you want</div>

      <template #append>
        <v-btn
          color="blue-grey-darken-4"
          exact
          to="/whitelist"
        >
          <v-icon start>mdi-account-check</v-icon>
          <span class="d-sm-none">Create</span>
          <span class="d-none d-sm-inline">Add accounts</span>
        </v-btn>
      </template>
    </v-alert>

    <FAQSection />
  </v-container>

  <UploadArchiveDialog v-model:show="showUploadDialog" />
</template>
