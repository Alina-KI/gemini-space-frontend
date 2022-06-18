import { Post } from './post'

export type User = {
  _id: string
  login: string
  password: string
  email: string
  phone: number
  name: string
  surname: string
  lastname: string
  dateOfBirth: string
  town: string
  avatar: string
  posts: Post[]
  imageFiles: string[]
  videoFiles: string[]
  audioFiles: string[]
}