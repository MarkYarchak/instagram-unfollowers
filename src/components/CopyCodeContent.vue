<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  value?: string;
  snackbarText?: string;
}

const props = defineProps<Props>();

const showSnackbar = ref<boolean>(false);

function copy($event: Event) {
  const text = props.value || ($event.target as HTMLElement).textContent;
  if (text) {
    navigator.clipboard.writeText(text);
    openSnackbar();
  }
}

function openSnackbar() {
  showSnackbar.value = true;
}

function closeSnackbar() {
  showSnackbar.value = false;
}
</script>

<template>
  <v-btn
    variant="outlined"
    size="small"
    @click="copy"
  >
    <v-icon start size="sm">mdi-content-copy</v-icon>
    <slot></slot>
  </v-btn>
  <v-snackbar
    v-model="showSnackbar"
    max-width="150"
    close-on-content-click
  >
    {{ snackbarText || 'Text copied' }}

    <template #actions>
      <v-btn
        color="primary"
        @click="closeSnackbar"
      >
        OK
      </v-btn>
    </template>
  </v-snackbar>
</template>
