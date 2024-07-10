import { useArchiveStorage } from '@/composables/archive-storage';
import { useArchiveReader } from '@/composables/archive-reader';
import { useInstagramConnections } from '@/composables/instagram-connections';
import type { ArchiveItem } from '@/db/archives-db';
import type { UnarchivedEntries } from '@/composables/archive-reader';
import type { ParsedFilesContent, ConnectionsData } from '@/composables/instagram-connections';

export function useInstagramArchive(archiveId: number) {
  const archiveStorage = useArchiveStorage();
  const archiveReader = useArchiveReader();
  const instagramConnections = useInstagramConnections();

  async function loadArchive(): Promise<ArchiveItem> {
    const archive = await archiveStorage.getItem(archiveId);
    if (!archive) {
      throw new Error(`Archive #${archiveId} not found`);
    }
    return archive;
  }

  async function parseArchive(archive: ArchiveItem): Promise<UnarchivedEntries> {
    const { entries } = await archiveReader.unzip(archive);
    return entries;
  }

  function loadContentFiles(fileEntries: UnarchivedEntries): ParsedFilesContent {
    return instagramConnections.parseFollowersAndFollowing(fileEntries);
  }

  function prepareConnectionsData(filesContent: ParsedFilesContent): ConnectionsData {
    return instagramConnections.getFullData(filesContent);
  }

  async function parseConnectionsData(): Promise<ConnectionsData> {
    return loadArchive()
      .then(parseArchive)
      .then(loadContentFiles)
      .then(prepareConnectionsData);
  }

  return {
    parseConnectionsData,
  };
}
