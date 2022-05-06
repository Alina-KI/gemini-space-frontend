import { makeAutoObservable, toJS } from 'mobx'
import { Dialog, DialogWithMessages, Message } from '../types/message'
import { socketStore } from './socket-store'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'
import { api } from '../api'
import { authStore } from './auth-store'

class DialogsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  dialogs: Dialog[] = []

  selectedDialog: null | DialogWithMessages = null

  getMyDialogs() {
    api.get<Dialog[]>('/dialogues')
      .then(res => this.dialogs = res.data.map(d => d.nameTalk ? d : {
        ...d,
        nameTalk: authStore.getUserNameSurname(authStore.getInterlocutor(d))
      }))
  }

  createDialog(dialog: CreateDialogPayload) {
    return socketStore.createDialog(dialog)
  }

  createGroupDialog(dialog: CreateGroupDialogPayload) {
    return socketStore.createGroupDialog(dialog)
  }

  async enterDialog(dialogId: string) {
    this.selectedDialog = await api.get(`/dialogues/getDialog/${dialogId}`).then(res => res.data)
  }

  exitDialog() {
    this.selectedDialog = null
  }

  sendMessage(text: string) {
    socketStore.sendMessage({
      dialogId: this.selectedDialog!._id,
      date: Date.now(),
      text
    })
  }

  handleReceiveMessage({ savedMessage, dialogId }: { savedMessage: Message, dialogId: string }) {
    if (dialogId === this.selectedDialog?._id) {
      this.selectedDialog!.messages.push(savedMessage)
    }
  }
}


export const dialogsStore = new DialogsStore()