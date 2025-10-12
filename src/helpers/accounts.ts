import type { ConnectionAccount } from '@/composables/instagram-connections';
import type { AccountLabel } from '@/db/account-labels-db';

export function getAccountCompareFields(account: ConnectionAccount) {
  return new Set([account.title, account.username].filter(Boolean));
}

export function hasCompareAccount(account: ConnectionAccount, compareAccounts: ConnectionAccount[]) {
  const compareFields = getAccountCompareFields(account);
  return compareAccounts.some(a => compareFields.has(a.username) || compareFields.has(a.title));
}

export function matchesAccount(account: ConnectionAccount, compareAccount: ConnectionAccount) {
  const compareFields = getAccountCompareFields(account);
  return compareFields.has(compareAccount.username) || compareFields.has(compareAccount.title);
}

export function matchesAccountLabel(account: ConnectionAccount, label: AccountLabel | undefined) {
  return [account.username, account.title].includes(label?.username);
}

export function getAccountUsername(account: ConnectionAccount) {
  return account.username || account.title;
}
