<script lang="ts" setup>
import { ref } from 'vue';
import { useCompareConnections } from '@/composables/compare-connections';
import type { ConnectionsData } from "@/composables/instagram-connections";

interface Props {
  connectionsData: ConnectionsData;
  compareConnectionsData: ConnectionsData;
}
const props = defineProps<Props>();

const compareConnections = useCompareConnections();
const comparedData = ref();

createComparedData();

function createComparedData() {
  comparedData.value = compareConnections.getDiff(props.connectionsData, props.compareConnectionsData);
}
</script>

<template>
  <div>{{ comparedData }}</div>
</template>
