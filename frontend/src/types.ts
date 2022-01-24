export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  password?: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  date_joined?: string
  last_login?: string
  userdetails?: UserDetails
}

export interface UserDetails {
  id?: number
  auth_user?: number
  file: string
  about: string
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: number
  title: string
  color: string
}

export interface Bit {
  id?: number
  auth_user?: number
  title: string
  content: string
  hashtags?: string
  category: number
  created_at?: string
  updated_at?: string
  images?: Image[]
}

export interface Image {
  id?: number
  bit: number
  file: string
  created_at?: string
  updated_at?: string
}

export interface Comment {
  id?: number
  bit?: number
  auth_user?: number
  content: string
  created_at?: string
  updated_at?: string
}

export interface Like {
  id?: number
  bit?: number
  auth_user?: number
  created_at?: string
  updated_at?: string
}

export interface Bookmark {
  id?: number
  bit?: number
  auth_user?: number
  created_at?: string
  updated_at?: string
}

export interface Stat {
  amount: number
  description: (amount: number) => string,
  icon?: string
  link?: string
}

export interface Friendship {
  // user: User
  // status: "friend" | "pending"
  id: number
  from_auth_user: number
  to_auth_user: number
  friendship_status: number
  created_at: Date
  updated_at: Date
}

export interface Credentials {
  username: string
  password: string
}

export interface JWTToken {
  user_id: number
  username: string
  exp: number // seconds since 1970 -> Date(exp * 1000)
  email: string
}

export interface SearchResult {
  users: User[]
  bits: Bit[]
}
