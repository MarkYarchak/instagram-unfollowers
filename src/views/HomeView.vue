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
    description: 'Download your archive from Instagram in JSON format. You can do it by the link',
    action: {
      title: 'Open Instagram',
      icon: 'mdi-open-in-new',
      href: INSTAGRAM_PERSONAL_DOWNLOAD_LINK,
    },
  },
  {
    title: '2. Upload data',
    description: 'Put your downloaded archive file into the area below or press the button',
    action: {
      title: 'Upload',
      icon: 'mdi-upload',
      onClick: openUploadDialog,
    },
  },
  {
    title: '3. Get the result',
    description: 'The result will be processed automatically and placed in preview tab',
    action: {
      title: 'Preview',
      icon: 'mdi-eye',
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
              variant="tonal"
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

    <FAQSection />
  </v-container>

  <UploadArchiveDialog v-model:show="showUploadDialog" />
</template>
