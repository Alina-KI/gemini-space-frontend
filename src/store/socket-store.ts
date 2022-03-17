import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'

class SocketStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  socket:Socket | null = null

  openSocket() {
    this.socket = io('http://localhost:5000', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem('user')}`,
          }
        }
      }
    })
    this.socket.on('connect', () => {
      console.log('Connected')
      this.socket!.emit('connectAllDialogs')

      this.socket!.emit('sendMessage', {'dsds': 42})
    })
    this.socket.on('exception', function(data) {
      console.log('event', data)
    })
    this.socket.on('disconnect', function() {
      console.log('Disconnected')
    })
  }
  handleReceiveMessage() {

  }
}

export const socketStore = new SocketStore()