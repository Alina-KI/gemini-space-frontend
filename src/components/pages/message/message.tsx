import React from 'react'
import { io } from 'socket.io-client'
import s from './message.module.scss'

export const Message = () => {
  const socket = io('http://localhost:5000')
  socket.on('connect', function() {
    console.log('Connected')
    socket.emit('events', { test: 'test' })
    socket.emit('identity', 0, (response: any) =>
      console.log('Identity:', response)
    )
  })
  socket.on('events', function(data) {
    console.log('event', data)
  })
  socket.on('exception', function(data) {
    console.log('event', data)
  })
  socket.on('disconnect', function() {
    console.log('Disconnected')
  })
  return (
    <div className={s.container}>
      <div className={s.messages}>
        <div className={s.message}>
          <div className={s.name}>
            dsafads
          </div>
          <div className={s.text}>
            gres
          </div>
          <div className={s.data}>
            20.02.2021
          </div>
        </div>
        <div className={`${s.message} ${s.message_own}`}>
          <div className={s.name}>
            dsafads
          </div>
          <div className={s.text}>
            gres
          </div>
          <div className={s.data}>
            20.02.2021
          </div>
        </div>
      </div>
    </div>
  )
}