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
}

export interface Comment {
  author: string
  content: string
}

export interface User {
  name: string
  username: string
  aboutme: string
}

export interface Stat {
  amount: number
  description: string
  icon?: string
  link?: string
}

export interface Friendship {
  user: User
  status: "friend" | "pending"
}
