import { Dexie, type EntityTable } from 'dexie';
import { SOURCE_FILES_DB_NAME, ARCHIVE_ITEMS_KEY } from '@/constants/indexeddb'

interface ArchiveItem {
  id: number;
  name: string;
  file: File;
  uploadDate: Date;
}

const db = new Dexie(SOURCE_FILES_DB_NAME) as Dexie & {
  [ARCHIVE_ITEMS_KEY]: EntityTable<ArchiveItem, 'id'>;
};

db.version(3).stores({
  [ARCHIVE_ITEMS_KEY]: '++id, name, file, uploadDate',
});

export type { ArchiveItem };
export { db };
