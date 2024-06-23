export const INSTAGRAM_PERSONAL_DOWNLOAD_LINK = 'https://accountscenter.instagram.com/info_and_permissions/dyi';

export const FOLLOWERS_AND_FOLLOWING_PATH = 'connections/followers_and_following';

export enum InstagramConnectionFiles {
  Followers = 'followers_*.json',
  Following = 'following.json',
  RecentlyUnfollowed = 'recently_unfollowed_accounts.json',
  RecentFollowRequests = 'recent_follow_requests.json',
  RestrictedAccounts = 'restricted_accounts.json',
  BlockedAccounts = 'blocked_accounts.json',
}
