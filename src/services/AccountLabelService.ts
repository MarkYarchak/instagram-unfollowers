import { db } from '@/db/account-labels-db';
import { getAccountUsername } from '@/helpers/accounts';
import type { AccountLabelsKey } from '@/constants/indexeddb';
import type { AccountLabel } from '@/db/account-labels-db';
import type { ConnectionAccount } from '@/composables/instagram-connections';


export enum LabelAccountErrorType {
  NoUsername = 'NoUsername',
  SameUsername = 'SameUsername',
}

export class AccountLabelService {
  dbKey: AccountLabelsKey;

  errorMessages: Partial<Record<LabelAccountErrorType, string>> = {
    NoUsername: 'You cannot create label without username',
    SameUsername: 'Label with the same username already exists',
  };

  constructor(dbKey: AccountLabelsKey) {
    this.dbKey = dbKey;
  }

  get labelsDB() {
    return db[this.dbKey];
  }

  getItems(archiveId?: number) {
    if (archiveId) {
      return this.labelsDB.where({ archiveId }).toArray();
    }
    return this.labelsDB.toArray();
  }

  async addItem(account: ConnectionAccount, archiveId: number) {
    const username = getAccountUsername(account);

    if (!username) {
      throw new Error(this.errorMessages.NoUsername);
    }
    const sameUsernameLabels = await this.labelsDB
      .where({ username })
      .and(label => label.archiveId === archiveId)
      .toArray();
    if (sameUsernameLabels.length) {
      throw new Error(this.errorMessages.SameUsername);
    }

    return this.labelsDB.add({
      archiveId,
      username,
      createDate: new Date(),
    });
  }

  async addItems(accounts: ConnectionAccount[], archiveId: number) {
    const usernames = accounts.map(a => getAccountUsername(a));
    if (usernames.some(u => !u)) {
      throw new Error(this.errorMessages.NoUsername);
    }

    const sameUsernameLabels = await this.labelsDB
      .where('username')
      .anyOf(usernames as string[])
      .and(label => label.archiveId === archiveId)
      .toArray();
    if (sameUsernameLabels.length) {
      throw new Error(this.errorMessages.SameUsername);
    }

    const createDate = new Date();
    const items = accounts.map((a) => ({
      archiveId,
      username: getAccountUsername(a)!,
      createDate,
    }));
    return this.labelsDB.bulkAdd(items);
  }

  deleteItem(label: AccountLabel) {
    return this.labelsDB.delete(label.id);
  }

  deleteItems(labels: AccountLabel[]) {
    const keys = labels.map(l => l.id);
    return this.labelsDB.bulkDelete(keys);
  }

  setErrorMessage(type: LabelAccountErrorType, message: string) {
    this.errorMessages[type] = message;
  }
}
