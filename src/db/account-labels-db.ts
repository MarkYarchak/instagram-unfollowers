import { Dexie, type EntityTable } from 'dexie';
import { ACCOUNT_LABELS_DB_NAME, AccountLabelsKey } from '@/constants/indexeddb'

interface AccountLabel {
  id: number;
  archiveId?: number;
  username: string;
  createDate: Date;
}

const db = new Dexie(ACCOUNT_LABELS_DB_NAME) as Dexie & {
  [AccountLabelsKey.Whitelist]: EntityTable<AccountLabel, 'id'>;
  [AccountLabelsKey.Removed]: EntityTable<AccountLabel, 'id'>;
};

const ACCOUNT_LABEL_KEYS = '++id, archiveId, username, createDate';

db.version(3).stores({
  [AccountLabelsKey.Whitelist]: ACCOUNT_LABEL_KEYS,
  [AccountLabelsKey.Removed]: ACCOUNT_LABEL_KEYS,
});

export type { AccountLabel };
export { db };
