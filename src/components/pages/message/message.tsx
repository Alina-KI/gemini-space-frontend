import React, { useEffect, useState } from 'react'
import s from './message.module.scss'
import image from '../../../images/2.jpg'
import { dialogsStore } from '../../../store/dialogs-store'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { toJS } from 'mobx'

export const Message = observer(() => {
  const { dialogId } = useParams<{ dialogId: string }>()
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
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
        {dialogsStore.selectedDialog?.messages.map(message =>
          <div className={`${s.message} ${s.message_own}`} key={message.dialogId}>
            {true && console.log(toJS(message))}
            <div className={s.name}>
              {message.sender.name}
            </div>
            <div className={s.text}>
              {message.text}
            </div>
            <div className={s.data}>
              {new Date(+message.date).toLocaleString()}
            </div>
          </div>
        )}
      </div>
      <form className={s.form}>
        <input value={messageText} onChange={e => setMessageText(e.target.value)} className={s.form_input} type="text" />
        <button onClick={e => {
          e.preventDefault()
          dialogsStore.sendMessage(messageText)
        }} className={s.form_buttonSend}>Send message</button>
      </form>
    </div>
  )
})