export type Dialog = {
  id: string
  nameTalk: string

}

export type Message = {
  text: string
  date: number
}

export type NewMessage = Message & {
  dialogId: string
}
