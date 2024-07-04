import { useAccountLabels } from '@/composables/account-labels/index';
import { AccountLabelsKey } from '@/constants/indexeddb';
import { LabelAccountErrorType } from '@/services/AccountLabelService';

export function useAccountsWhitelist() {
  const accountLabels = useAccountLabels(AccountLabelsKey.Whitelist);
  const accountLabelService = accountLabels.service;

  accountLabelService.setErrorMessage(LabelAccountErrorType.NoUsername, 'You can only whitelist accounts with username');
  accountLabelService.setErrorMessage(LabelAccountErrorType.SameUsername, 'Account with specified username is already whitelisted');

  return {
    ...accountLabels.API,
    async addNoArchiveItem(username: string) {
      const lowercaseUsername = username.toLowerCase();

      const sameUsernameLabels = await accountLabelService
        .labelsDB
        .where('username')
        .equals(lowercaseUsername)
        .filter(label => typeof label.archiveId === 'undefined')
        .toArray();
      if (sameUsernameLabels.length) {
        throw new Error(accountLabelService.errorMessages.SameUsername);
      }

      return accountLabelService.labelsDB.add({
        username: lowercaseUsername,
        createDate: new Date(),
      });
    },
  };
}
