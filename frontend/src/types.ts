export interface Category {
  name: string
}

export interface Bit {
  title: string
  author: string
  content: string
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