<script lang="ts" setup>
import ExternalLink from '@/components/ExternalLink.vue';
import GitHubSourceLink from '@/components/GitHubSourceLink.vue';
import CopyTextContent from '@/components/CopyCodeContent.vue';
import { INSTAGRAM_DOWNLOAD_HELP, INSTAGRAM_PERSONAL_DOWNLOAD_LINK } from '@/constants/sources';

const furtherQuestionsText = 'If you have any further questions you can read the official documentation';
</script>

<template>
  <h2 class="mt-8 mb-3">FAQ</h2>
  <v-expansion-panels>
    <v-expansion-panel title="Can I preview my archive on the mobile phone?">
      <template v-slot:text>
        <p>
          Yes. You have to download the archive with your instagram data and then upload it here from your mobile device.
          Everything should work in the same way as on desktop devices.
        </p>
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="How should I download my Instagram data?">
      <template v-slot:text>
        <ol class="pl-5">
          <li>Open Instagram personal information page <ExternalLink :href="INSTAGRAM_PERSONAL_DOWNLOAD_LINK">Open</ExternalLink>;</li>
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
        <p class="mt-3">
          {{ furtherQuestionsText }}
          <ExternalLink :href="INSTAGRAM_DOWNLOAD_HELP">
            <span class="text-none">{{ INSTAGRAM_DOWNLOAD_HELP }}</span>
          </ExternalLink>
        </p>
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="Link to personal information page doesn't work on my phone">
      <template v-slot:text>
        <p>
          You have to be logged into your Instagram account on your default in-app browser for everything to work well. <br>
          If the link still doesn't navigate you to the Instagram download settings then you can deal with it in both ways:
        </p>
        <h4>Method 1</h4>
        <ul class="pl-5">
          <li>Open the Instagram app;</li>
          <li>Go to the <b>Profile settings</b>;</li>
          <li>Then tap <b>Your activity</b>;</li>
          <li>Then tap <b>Download your information</b>.</li>
        </ul>
        <h4>Method 2</h4>
        <ul class="pl-5">
          <li>Login to your Instagram account from the browser;</li>
          <li>
            <span class="text-break">{{ INSTAGRAM_PERSONAL_DOWNLOAD_LINK }}</span> <br class="d-sm-none">
            <CopyTextContent
              :value="INSTAGRAM_PERSONAL_DOWNLOAD_LINK"
              snackbar-text="Link copied"
            >
              Copy link
            </CopyTextContent>;
          </li>
          <li>Put the copied link into your browser. Download settings will be available by the link.</li>
        </ul>
        <p class="mt-3">
          {{ furtherQuestionsText }}
          <ExternalLink :href="INSTAGRAM_DOWNLOAD_HELP">
            <span class="text-none">{{ INSTAGRAM_DOWNLOAD_HELP }}</span>
          </ExternalLink>
        </p>
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="Is my data safe?">
      <template v-slot:text>
        <p>
          Yes. Your data is completely safe as we don't share or store any of your personal information. This service
          only provides the way to preview the information you want. This resource only uses basic analytics data
          (Google Analytics) such as visiting statics to analyze and improve the product.
        </p>
        <p>
          If you don't want collecting any data or you're feeling uncomfortable, you can fork the
          <GitHubSourceLink size="x-small">source code</GitHubSourceLink> and build it based on your wishes.
        </p>
      </template>
    </v-expansion-panel>
    <v-expansion-panel title="How can I prove the safety?">
      <template v-slot:text>
        The project is open-source and the code is available by the link to GitHub <br>
        <GitHubSourceLink class="mt-2">Open project</GitHubSourceLink>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
