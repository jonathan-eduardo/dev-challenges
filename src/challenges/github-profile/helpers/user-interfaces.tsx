export interface UserInfo {
  avatar_url: string
  name: string
  location: string
  bio: string
  followers: number
  following: number
}

export interface UserRepository {
  id: string
  html_url: string
  name: string
  description: string
  license: { spdx_id: string } | null
  forks: number
  watchers: number
  updated_at: string
}
