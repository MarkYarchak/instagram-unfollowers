import { detailedDiff } from 'deep-object-diff';
import type { ConnectionsData } from "@/composables/instagram-connections";

export function useCompareConnections() {
  return {
    getDiff,
  };
}

function getDiff(connectionsData1: ConnectionsData, connectionsData2: ConnectionsData) {
  return detailedDiff(connectionsData1, connectionsData2);
}
