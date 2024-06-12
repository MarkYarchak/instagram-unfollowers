import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';
import { db } from '@/db/archives-db';
import { ARCHIVE_ITEMS_KEY } from '@/constants/indexeddb';

import type { ArchiveItem } from '@/db/archives-db'
import type { Ref } from 'vue';

const archivesDB = db[ARCHIVE_ITEMS_KEY];

export function useArchiveStorage() {
  return {
    getLiveItems: getArchiveLiveItems,
    getItems: getArchiveItems,
    getItem: getArchiveItem,
    addItem: addArchive,
    deleteItem: deleteArchive,
  };
}

function getArchiveLiveItems() {
  return useObservable(liveQuery(getArchiveItems) as any) as Ref<ArchiveItem[]>;
}

function getArchiveItems() {
  return archivesDB.toArray();
}

function getArchiveItem(key: number) {
  return archivesDB.get(key);
}

async function addArchive(file: File) {
  const sameNameArchives = await archivesDB.where('name').equals(file.name).toArray();
  if (sameNameArchives.length) {
    throw new Error('File with such name was already uploaded before');
  }

  return archivesDB.add({ name: file.name, file });
}

function deleteArchive(key: number) {
  return archivesDB.delete(key);
}
