export type Dialog = {

}

export type Message = {
  text: string
  date: number
}

export type NewMessage = Message & {
  dialogId: string
}
