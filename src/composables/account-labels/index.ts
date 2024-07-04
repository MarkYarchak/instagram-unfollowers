import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';
import { AccountLabelService } from '@/services/AccountLabelService';
import type { Ref } from 'vue';
import type { AccountLabel } from '@/db/account-labels-db';
import type { AccountLabelsKey } from '@/constants/indexeddb';
import type { ConnectionAccount } from '@/composables/instagram-connections';

export function useAccountLabels(dbKey: AccountLabelsKey) {
  const accountLabelService = new AccountLabelService(dbKey);

  return {
    service: accountLabelService,
    API: {
      getLiveItems(archiveId?: number, sort?: boolean) {
        return useObservable(liveQuery(() => this.getItems(archiveId, sort)) as any) as Ref<AccountLabel[]>;
      },
      async getItems(archiveId?: number, sort?: boolean) {
        const items = await accountLabelService.getItems(archiveId);
        if (sort) {
          items.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
        }
        return items;
      },
      addItem(account: ConnectionAccount, archiveId: number) {
        return accountLabelService.addItem(account, archiveId);
      },
      addItems(accounts: ConnectionAccount[], archiveId: number) {
        return accountLabelService.addItems(accounts, archiveId);
      },
      deleteItem(label: AccountLabel) {
        return accountLabelService.deleteItem(label);
      },
      deleteItems(labels: AccountLabel[]) {
        return accountLabelService.deleteItems(labels);
      },
    },
  };
}
