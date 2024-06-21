<script lang="ts" setup>
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
  <h2 class="mt-8 mb-3">FAQ</h2>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="safetyCard of safetyCards"
      :key="safetyCard.title"
      :title="safetyCard.title"
      :text="safetyCard.description"
    ></v-expansion-panel>
  </v-expansion-panels>
</template>
