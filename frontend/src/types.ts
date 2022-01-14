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
  id?: number
  bitId?: number
  auth_user?: number
  content: string
  created_at?: string
  updated_at?: string
}

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
