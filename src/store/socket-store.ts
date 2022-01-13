import { makeAutoObservable } from 'mobx'
import { io, Socket } from 'socket.io-client'

class SocketStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  socket:Socket | null = null

  openSocket() {
    this.socket = io('http://localhost:5000')
    this.socket.on('connect', () => {
      console.log('Connected')
      // this.socket!.emit('events', { test: 'test' })
      // this.socket!.emit('identity', 0, (response: any) =>
      //   console.log('Identity:', response)
      // )

      this.socket!.emit('sendMessage', { test: 'test' })
    })
    this.socket.on('events', function(data) {
      console.log('event', data)
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