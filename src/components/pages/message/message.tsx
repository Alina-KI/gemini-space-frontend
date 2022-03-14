import React, { useEffect } from 'react'
import s from './message.module.scss'
import { socketStore } from '../../../store/socket-store'
import image from '../../../images/2.jpg'

export const Message = () => {
  useEffect(() => {
    socketStore.openSocket()
  },[])

  return (
    <div className={s.container}>
      <div className={s.container_header}>
        <img className={s.container_header__image} src={image} alt="" />
        Alis Jasm
      </div>
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
      <form className={s.form} action="">
        <input className={s.form_input} type="text" />
        <button className={s.form_buttonSend}>Send message</button>
      </form>
    </div>
  )
}