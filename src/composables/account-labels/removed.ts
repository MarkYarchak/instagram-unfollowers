import { useAccountLabels } from '@/composables/account-labels/index';
import { AccountLabelsKey } from '@/constants/indexeddb';
import { LabelAccountErrorType } from '@/services/AccountLabelService';

export function useRemovedAccountsStorage() {
  const accountLabels = useAccountLabels(AccountLabelsKey.Removed);
  const accountLabelService = accountLabels.service;

  accountLabelService.setErrorMessage(LabelAccountErrorType.NoUsername, 'You can only remove accounts with username');
  accountLabelService.setErrorMessage(LabelAccountErrorType.SameUsername, 'Account with specified username is already removed');

  return {
    ...accountLabels.API,
    getLiveItems(archiveId?: number) {
      return accountLabels.API.getLiveItems(archiveId, true);
    },
    getItems(archiveId: number) {
      return accountLabels.API.getItems(archiveId, true);
    },
  };
}
