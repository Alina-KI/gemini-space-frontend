import { makeAutoObservable } from 'mobx'
import { Dialog, Message } from '../types/message'
import { socketStore } from './socket-store'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'
import { api } from '../api'
import { authStore } from './auth-store'
import { getFileUrl } from '../functions/get-file-url'

class DialogsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  dialogs: Dialog[] = []

  selectedDialog: null | Dialog | undefined = null

  get sortedDialogs(): Dialog[] {
    // @ts-ignore
    return this.dialogs.slice().sort((d1, d2) => new Date(+d1.messages[d1.messages.length - 1]?.date) - new Date(+d2.messages[d2.messages.length - 1]?.date))
  }

  getMyDialogs() {
    return api.get<Dialog[]>('/dialogues')
      .then(res => this.dialogs = res.data.map(d => d.nameTalk ? d : {
        ...d,
        nameTalk: authStore.getUserNameSurname(authStore.getInterlocutor(d))
      }))
  }

  async createDialog(dialog: CreateDialogPayload) {
    const newDialog = await socketStore.createDialog(dialog)
    await this.getMyDialogs()
    return newDialog
  }

  async createGroupDialog(dialog: CreateGroupDialogPayload) {
    const formData = new FormData()
    formData.append('image', dialog.image)
    const imagePath = await api.post('files/upload/images', formData).then(res => res.data)
    const newDialog = await socketStore.createGroupDialog({ ...dialog, image: imagePath })
    await this.getMyDialogs()
    return newDialog
  }

  async enterDialog(dialogId: string) {
    // this.selectedDialog = await api.get(`/dialogues/getDialog/${dialogId}`).then(res => res.data)
    this.selectedDialog = this.dialogs.find(d => d._id === dialogId)
    if (this.selectedDialog?.image)
      this.selectedDialog.image = getFileUrl(this.selectedDialog.image)
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