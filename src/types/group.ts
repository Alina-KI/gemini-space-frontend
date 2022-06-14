import { User } from './user'

export type Group = {
  _id: string
  title: string
  description: string
  members: User[]
  creator: User
  posts: string[]
  photo: string
}
