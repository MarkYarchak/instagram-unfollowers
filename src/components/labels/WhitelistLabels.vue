<script setup lang="ts">
import { computed } from 'vue';
import { useAccountsWhitelist } from '@/composables/account-labels/whitelist';
import LabelsList from '@/components/labels/LabelsList.vue';
import type { AccountLabel } from '@/db/account-labels-db';

interface Props {
  filter?: (label: AccountLabel) => boolean;
}

const props = defineProps<Props>();

const accountsWhitelist = useAccountsWhitelist();
const whitelistLabels = accountsWhitelist.getLiveItems(undefined, true);

const filteredLabels = computed(() => {
  if (!props.filter) {
    return whitelistLabels.value;
  }
  return whitelistLabels.value.filter(props.filter)
});

function deleteLabel(label: AccountLabel) {
  accountsWhitelist.deleteItem(label);
}
</script>

<template>
  <LabelsList
    v-if="whitelistLabels"
    :items="filteredLabels"
  >
    <template #item-append="{ item }">
      <v-btn
        variant="flat"
        icon="mdi-close"
        @click="deleteLabel(item)"
      ></v-btn>
    </template>
  </LabelsList>
  <div v-else class="d-flex justify-center py-5">
    <v-progress-circular
      indeterminate
      size="50"
    />
  </div>
</template>
