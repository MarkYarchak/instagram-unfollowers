import { unzip } from 'unzipit';
import type { ZipEntry } from 'unzipit';
import type { ArchiveItem } from '@/db/archives-db';

export interface UnarchivedEntries {
  [p: string]: ZipEntry;
}

export function useArchiveReader() {
  return {
    unzip: unzipArchive,
  };
}

async function unzipArchive(archive: ArchiveItem) {
  const objectURL = URL.createObjectURL(archive.file);
  const result = await unzip(objectURL);
  URL.revokeObjectURL(objectURL);
  return result;
}
