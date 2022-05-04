import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'
import { dialogsStore } from './dialogs-store'
import { Dialog, NewMessage } from '../types/message'
import { CreateDialogPayload, CreateGroupDialogPayload } from '../types/dialog'

class SocketStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  socket: Socket | null = null

  openSocket() {
    this.socket = io('http://localhost:5000', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        }
      }
    })
    this.socket.on('connect', () => {
      console.log('Connected')
      this.socket!.emit('connectAllDialogs')
    })
    this.socket.on('receiveMessage', dialogsStore.handleReceiveMessage)
    this.socket.on('exception', function(data) {
      console.log('event', data)
    })
    this.socket.on('disconnect', function(data) {
      console.log('Disconnected', data)
    })
  }

  sendMessage(message: NewMessage) {
    console.log('send')
    this.socket!.emit('sendMessage', message)
  }

  createDialog(dialog: CreateDialogPayload): Promise<Dialog> {
    return new Promise(resolve => this.socket!.emit(
      'createDialog',
      dialog,
      (dialog: Dialog) => resolve(dialog)
    )
    )
  }
  createGroupDialog(dialog: CreateGroupDialogPayload): Promise<Dialog> {
    return new Promise(resolve => this.socket!.emit(
      'createGroupDialog',
      dialog,
      (dialog: Dialog) => resolve(dialog))
    )
  }

}

export const socketStore = new SocketStore()