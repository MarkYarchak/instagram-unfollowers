<script lang="ts" setup>
import InstagramPersonalDownloadLink from '@/components/InstagramPersonalDownloadLink.vue';
import { GITHUB_SOURCE_URL } from '@/constants/links';
</script>

<template>
  <h2 class="mt-8 mb-3">FAQ</h2>
  <v-expansion-panels>
    <v-expansion-panel title="How should I download my Instagram data?">
      <template v-slot:text>
        <ol class="pl-5">
          <li>Open Instagram personal information page <InstagramPersonalDownloadLink>Open</InstagramPersonalDownloadLink>;</li>
          <li>Click <b>Download or share information</b>;</li>
          <li>Select <b>Some your information</b>;</li>
          <li>In the Connection section select <b>Followers and following</b>;</li>
          <li>
            On the next step choose preferred method to receive your information and Instagram will notify you on your email in a few minutes;
            <ul class="pl-5">
              <li>If you selected <b>Download to device</b> your information will be available to download on the same page.</li>
            </ul>
          </li>
          <li>Select the date range (period) for which you want to get the details (<b>All time</b> is recommended) and use <b>JSON</b> format of data;</li>
          <li>Then Instagram will provide you the archive with results based on selected method of receiving the information.</li>
        </ol>
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="Is my data safe?">
      <template v-slot:text>
        Yes. Your data is completely safe as we don't share or store any of your personal information. This service only
        provides the way to preview the information you want
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="How can I prove the safety?">
      <template v-slot:text>
        The project is open-source and the code is available by the link to GitHub <br>
        <v-btn
          :href="GITHUB_SOURCE_URL"
          target="_blank"
          variant="tonal"
          size="small"
          class="mt-2"
        >
          <v-icon start>mdi-github</v-icon>
          Open project
        </v-btn>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
