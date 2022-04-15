import React, { useEffect } from 'react'
import s from './message.module.scss'
import image from '../../../images/2.jpg'
import { dialogsStore } from '../../../store/dialogs-store'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Message = observer(() => {
  const { dialogId } = useParams<{ dialogId: string }>()

  useEffect(() => {
    console.log('ЧЕЛ ТЫ', dialogId)
    dialogsStore.enterDialog(dialogId).then()

    return () => dialogsStore.exitDialog()
  }, [dialogId])

  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

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
})