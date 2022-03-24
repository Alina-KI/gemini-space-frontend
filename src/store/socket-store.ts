import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'
import { receiveMessageOnPort } from 'worker_threads'
import { dialogsStore } from './dialogs-store'
import { Dialog, NewMessage } from '../types/message'
import { log } from 'util'

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
    this.socket.on('disconnect', function() {
      console.log('Disconnected')
    })
  }

  sendMessage(message: NewMessage) {
    this.socket!.emit('sendMessage', message)
  }

  getDialog(dialogId: string): Promise<Dialog> {
    return new Promise(resolve => this.socket!.emit(
      'getDialog',
      dialogId,
      (dialog: Dialog) => resolve(dialog))
    )
  }

}

export const socketStore = new SocketStore()