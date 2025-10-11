export const INSTAGRAM_DOWNLOAD_HELP = 'https://help.instagram.com/181231772500920';

export const INSTAGRAM_PERSONAL_DOWNLOAD_LINK = 'https://accountscenter.instagram.com/info_and_permissions/dyi';

export const FOLLOWERS_AND_FOLLOWING_PATH = 'connections/followers_and_following';

export enum InstagramConnectionFiles {
  Followers = 'followers_*.json',
  Following = 'following.json',
  RecentlyUnfollowedAccounts = 'recently_unfollowed_accounts.json',
  RecentlyUnfollowedProfiles = 'recently_unfollowed_profiles.json',
  RecentFollowRequests = 'recent_follow_requests.json',
  RestrictedAccounts = 'restricted_accounts.json',
  RestrictedProfiles = 'restricted_profiles.json',
  BlockedAccounts = 'blocked_accounts.json',
  BlockedProfiles = 'blocked_profiles.json',
}
