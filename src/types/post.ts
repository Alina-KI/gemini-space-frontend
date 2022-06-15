import { User } from './user'
import { Comment } from './comment'

export type Post = {
  _id: string
  title: string
  text: string
  files: string[]
  datePublished: string
  comments: Comment[]
  user: User
  likes: User[]
}
