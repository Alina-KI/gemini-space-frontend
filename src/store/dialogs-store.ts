import { makeAutoObservable } from 'mobx'
import { Dialog, Message, NewMessage } from '../types/message'
import { socketStore } from './socket-store'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'
import { api } from '../api'

class DialogsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  dialogs: Dialog[] = []

  messages: Message[] = []
  selectedDialog: null | Dialog = null

  getMyDialogs() {
    api.get<Dialog[]>('/dialogues')
      .then(res => this.dialogs = res.data)
  }

  createDialog(dialog: CreateDialogPayload) {
    return socketStore.createDialog(dialog)
  }

  createGroupDialog(dialog: CreateGroupDialogPayload) {
    return socketStore.createGroupDialog(dialog)
  }

  async enterDialog(dialogId: string) {
    this.selectedDialog = await socketStore.getDialog(dialogId)
  }

  exitDialog() {
    this.selectedDialog = null
  }

  sendMessage(text: string) {
    socketStore.sendMessage({
      dialogId: this.selectedDialog!.id,
      date: Date.now(),
      text
    })
  }

  handleReceiveMessage(newMessage: NewMessage) {
    if (newMessage.dialogId === this.selectedDialog?.id) {
      this.messages.push(newMessage)
    }
  }
}


export const dialogsStore = new DialogsStore()