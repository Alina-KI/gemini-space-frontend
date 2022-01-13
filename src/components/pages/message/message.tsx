import React, { useEffect } from 'react'
import s from './message.module.scss'
import { socketStore } from "../../../store/socket-store";

export const Message = () => {
  useEffect(() => {
    socketStore.openSocket()
  },[])

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