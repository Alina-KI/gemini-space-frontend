import { makeAutoObservable } from 'mobx'
import { Dialog, Message } from '../types/message'
import { socketStore } from './socket-store'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'
import { api } from '../api'
import { authStore } from './auth-store'

class DialogsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  dialogs: Dialog[] = []

  selectedDialog: null | Dialog = null

  get sortedDialogs(): Dialog[] {
    // @ts-ignore
    return this.dialogs.slice().sort((d1, d2) => new Date(+d1.messages[d1.messages.length - 1]?.date) - new Date(+d2.messages[d2.messages.length - 1]?.date))
  }

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
      date: Date.now().toString(),
      text
    })
  }

  handleReceiveMessage({ savedMessage, dialogId }: { savedMessage: Message, dialogId: string }) {
    if (dialogId === this.selectedDialog?._id) {
      this.selectedDialog!.messages.push(savedMessage)
      setTimeout(this.onNewMessage, 0)
    }
    else {
      const dialog = this.dialogs.find(d => d._id === dialogId)
      if (dialog)
        dialog.messages.push(savedMessage)

    }
  }

  onNewMessage = () => {
  }

  setOnNewMessage(callback: () => void) {
    this.onNewMessage = callback
  }
}


export const dialogsStore = new DialogsStore()