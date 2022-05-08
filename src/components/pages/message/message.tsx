import React, { useEffect, useRef, useState } from 'react'
import s from './message.module.scss'
import image from '../../../images/2.jpg'
import { dialogsStore } from '../../../store/dialogs-store'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { useRefDimensions } from '../../../hooks/use-ref-dimensions'

export const Message = observer(() => {
  const { dialogId } = useParams<{ dialogId: string }>()
  const [messageText, setMessageText] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const { height, width } = useRefDimensions(messagesRef)

  useEffect(() => {
    dialogsStore.setOnNewMessage(() => messagesRef.current!.scrollTo({ top: messagesRef.current!.scrollHeight }))
  }, [])

  useEffect(() => {
    dialogsStore.enterDialog(dialogId).then()

    return () => dialogsStore.exitDialog()
  }, [dialogId])

  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'} />

  return (
    <div className={s.container}>
      <div className={s.container_header}>
        <img className={s.container_header__image} src={image} alt="" />
        Alis Jasm
      </div>
      <div className={s.messages} ref={messagesRef}>
        {dialogsStore.selectedDialog?.messages.map(message =>
          <div className={`${s.message} ${s.message_own}`} key={message.date}>
            <div className={s.name}>
              {message.sender.name}
            </div>
            <div className={s.text}>
              {message.text}
            </div>
            <div className={s.data}>
              {new Date(+message.date).toDateString() + ' ' + new Date(+message.date).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
      <form className={s.form} style={{ width: `${width}px`, margin: `${height + 60}px auto` }}>
        <input value={messageText} onChange={e => setMessageText(e.target.value)} className={s.form_input}
          type="text" />
        <button onClick={e => {
          e.preventDefault()
          dialogsStore.sendMessage(messageText)
          setMessageText('')
        }} className={s.form_buttonSend}>Send message
        </button>
      </form>
    </div>
  )
})