import { makeAutoObservable } from 'mobx'
import { Dialog, Message } from '../types/message'
import { socketStore } from './socket-store'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'
import { api } from '../api'
import { authStore } from './auth-store'
import { User } from '../types/user'
import { userFilesStore } from './user-files-store'

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
      .then(async res => this.dialogs = await Promise.all(res.data.map(async d => d.nameTalk ? d : {
        ...d,
        nameTalk: authStore.getUserNameSurname(await authStore.getInterlocutor(d))
      })))
  }

  async createDialog(dialog: CreateDialogPayload) {
    const newDialog = await socketStore.createDialog(dialog)
    await this.getMyDialogs()
    return newDialog
  }

  async createGroupDialog(dialog: CreateGroupDialogPayload) {
    const image = await userFilesStore.uploadPhotoFiles(dialog.image)
    const newDialog = await socketStore.createGroupDialog({ ...dialog, image })
    await this.getMyDialogs()
    return newDialog
  }

  async deleteDialog(dialog: Dialog) {
    // this.dialogs = this.dialogs.filter(d => d._id !== dialog)
  }

  async enterDialog(dialogId: string) {
    this.selectedDialog = await api.get(`/dialogues/getDialog/${dialogId}`).then(res => res.data)
    if (!this.selectedDialog?.nameTalk){
      this.selectedDialog!.nameTalk = authStore.getUserNameSurname(await authStore.getInterlocutor(this.selectedDialog!))
    }
    if (!this.selectedDialog?.image) {
      const user: User = await authStore.getInterlocutor(this.selectedDialog!).then()
      this.selectedDialog!.image = user.avatar
    }
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