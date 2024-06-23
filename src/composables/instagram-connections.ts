import { objectPick } from '@vueuse/core';
import { FOLLOWERS_AND_FOLLOWING_PATH, InstagramConnectionFiles } from '@/constants/sources';
import type { ZipEntry } from 'unzipit';
import type { UnarchivedEntries } from '@/composables/archive-reader';

export interface ParsedFilesContent {
  [k: string]: any;
}

export interface ConnectionAccount {
  title?: string;
  username?: string;
  href: string;
  timestamp: number;
}

type ConnectionAccountPick = (keyof ConnectionAccount)[];

interface ListDataItem {
  title: string;
  media_list_data: unknown[];
  string_list_data: { value: string; href: string; timestamp: number }[];
}

export function useInstagramConnections() {
  return {
    parseFollowersAndFollowing,
    getFollowers,
    getFollowing,
    getNotFollowingBack,
    getNotFollowBack,
    getRecentlyUnfollowed,
    getRecentFollowRequests,
    getRestrictedAccounts,
    getBlockedAccounts,
  };
}

async function parseFollowersAndFollowing(fileEntries: UnarchivedEntries) {
  const parsedEntries: ParsedFilesContent = {};

  const entries = Object.entries(fileEntries);
  const followersAndFollowingEntries = entries
    .filter(e => e[0].startsWith(FOLLOWERS_AND_FOLLOWING_PATH) && e[0] !== `${FOLLOWERS_AND_FOLLOWING_PATH}/`)
    .map(e => [e[0].slice(FOLLOWERS_AND_FOLLOWING_PATH.length + 1), e[1]] as [string, ZipEntry]);

  if (!followersAndFollowingEntries.length) {
    return null;
  }

  for await (const [name, content] of followersAndFollowingEntries) {
    parsedEntries[name] = await content.json();
  }

  return parsedEntries;
}

function getFollowers(filesContent: ParsedFilesContent, pick?: ConnectionAccountPick): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.Followers;
  // Escape any regex special characters in the pattern except '*'
  const escapedPattern = fileName.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
  const followersRegexPattern = new RegExp('^' + escapedPattern.replace(/\*/g, '.*') + '$');

  const involvedFilesContent: ListDataItem[] = [];
  for (const [key, oneFileContent] of Object.entries(filesContent)) {
    if (followersRegexPattern.test(key)) {
      involvedFilesContent.push(...oneFileContent);
    }
  }

  return involvedFilesContent.map((i: ListDataItem) => formatConnectionAccount(i, pick));
}

function getFollowing(filesContent: ParsedFilesContent, pick?: ConnectionAccountPick): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.Following;
  const fileContent = filesContent[fileName];
  return fileContent.relationships_following.map((i: ListDataItem) => formatConnectionAccount(i, pick));
}

function getNotFollowingBack(filesContent: ParsedFilesContent): ConnectionAccount[] {
  const onlyFields: ConnectionAccountPick = ['title', 'username', 'href'];
  const followers = getFollowers(filesContent, onlyFields);
  const following = getFollowing(filesContent, onlyFields);

  return following.filter((f) => !followers.some(follower => follower.username === f.username));
}

function getNotFollowBack(filesContent: ParsedFilesContent) {
  const onlyFields: ConnectionAccountPick = ['title', 'username', 'href'];
  const followers = getFollowers(filesContent, onlyFields);
  const following = getFollowing(filesContent, onlyFields);

  return followers.filter((follower) => !following.some(f => f.username === follower.username));
}

function getRecentlyUnfollowed(filesContent: ParsedFilesContent): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.RecentlyUnfollowed;
  const fileContent = filesContent[fileName];
  return fileContent.relationships_unfollowed_users.map((i: ListDataItem) => formatConnectionAccount(i));
}

function getRecentFollowRequests(filesContent: ParsedFilesContent): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.RecentFollowRequests;
  const fileContent = filesContent[fileName];
  return fileContent.relationships_permanent_follow_requests.map((i: ListDataItem) => formatConnectionAccount(i));
}

function getRestrictedAccounts(filesContent: ParsedFilesContent): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.RestrictedAccounts;
  const fileContent = filesContent[fileName];
  return fileContent.relationships_restricted_users.map((i: ListDataItem) => formatConnectionAccount(i));
}

function getBlockedAccounts(filesContent: ParsedFilesContent): ConnectionAccount[] {
  const fileName = InstagramConnectionFiles.BlockedAccounts;
  const fileContent = filesContent[fileName];
  return fileContent.relationships_blocked_users.map((i: ListDataItem) => formatConnectionAccount(i));
}

function formatConnectionAccount(listDataItem: ListDataItem, pick?: ConnectionAccountPick): ConnectionAccount {
  const { title } = listDataItem;
  const { value: username, href, timestamp } = listDataItem.string_list_data[0];
  const account = {
    title,
    username,
    href,
    timestamp,
  };

  if (pick) {
    return objectPick(account, pick);
  }
  return account;
}
