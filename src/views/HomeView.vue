<script setup lang="ts">
import { ref } from 'vue';
import UploadArchiveDialog from '@/components/UploadArchiveDialog.vue';

const showDialog = ref(false);

const guideSteps = [
  {
    title: '1. Fetch data',
    description: 'Download your archive from Instagram in JSON format. You can do it by the link',
    action: {
      title: 'Open Instagram',
      icon: 'mdi-open-in-new',
      href: 'https://accountscenter.instagram.com/info_and_permissions/dyi',
    },
  },
  {
    title: '2. Upload data',
    description: 'Put your downloaded archive file into the area below or press the button',
    action: {
      title: 'Upload',
      icon: 'mdi-upload',
      onClick: () => showDialog.value = true,
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

const safetyCards = [
  {
    title: 'How should I download my Instagram data?',
    description: 'On the Instagram personal information page click "Download or share information", then "Some your information", then in the Connection section select "Followers and following". On the next step choose preferred method to receive your information and on the following step select the period for which you want to have the details and use JSON format of data. Then Instagram will provide you the archive with results based on selected method',
    image: '',
  },
  {
    title: 'Is my data safe?',
    description: 'Yes. Your data is completely safe as we don\'t share or store any of your personal information. This service only provides the way to preview the information you want',
    image: '',
  },
  {
    title: 'How can I prove the safety?',
    description: 'The project is open-source and the code is available by the link to GitHub',
    image: '',
  },
];
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

    <h2 class="mt-8 mb-3">FAQ</h2>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="safetyCard of safetyCards"
        :key="safetyCard.title"
        :title="safetyCard.title"
        :text="safetyCard.description"
      ></v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <UploadArchiveDialog v-model:show="showDialog" />
</template>
