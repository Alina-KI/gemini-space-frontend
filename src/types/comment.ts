import { User } from './user'

export type Comment = {
  _id: string
  title: string
  text: string
  files: string[]
  datePublished: string
  user: User
  likes: User[]
}
