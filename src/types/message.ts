import { User } from './user'

export type Dialog = {
  _id: string
  nameTalk: string
  users: User[]
  messages: Message[]
}

export type Message = {
  text: string
  date: number
  dialogId: string
  sender: User
}

export type NewMessage =  {
  text: string
  date: number
  dialogId: string
}
