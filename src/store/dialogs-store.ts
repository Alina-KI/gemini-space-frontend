import { makeAutoObservable } from 'mobx'
import { Dialog, Message, NewMessage } from '../types/message'
import { socketStore } from './socket-store'

class DialogsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  messages: Message[] = []
  selectedDialogId: null | string = null
  selectedDialog: null | Dialog = null

  async enterDialog(dialogId: string) {
    this.selectedDialogId = dialogId
    const dialog = await socketStore.getDialog(dialogId)
    this.selectedDialog = dialog
  }

  exitDialog() {
    this.selectedDialogId = null
    this.selectedDialog = null
  }

  sendMessage(text: string) {
    socketStore.sendMessage({
      dialogId: this.selectedDialogId!,
      date: Date.now(),
      text
    })
  }

  handleReceiveMessage(newMessage: NewMessage) {
    if (newMessage.dialogId === this.selectedDialogId) {
      this.messages.push(newMessage)
    }
  }
}


export const dialogsStore = new DialogsStore()