import { User } from './user'

export type Group = {
  title: string
  description: string
  members: User[];
  creator: User;
  posts: string[];
}