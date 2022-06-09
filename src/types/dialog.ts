import { User } from './user'

export type CreateDialogPayload = {
  anotherUserLogin: string
}

export type CreateGroupDialogPayload = {
  nameTalk: string
  users: User[]
  image: File
}

export type CreateGroupDialogPayloadWithImage = {
  nameTalk: string
  users: User[]
  image: string
}