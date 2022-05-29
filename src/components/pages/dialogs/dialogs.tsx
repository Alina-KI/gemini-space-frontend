import React from 'react'
import s from './dialogs.module.scss'
import photo from '../../../images/2.jpg'
import { observer } from 'mobx-react-lite'
import { dialogsStore } from '../../../store/dialogs-store'
import { NavLink } from 'react-router-dom'

export const Dialogs = observer(() => {
  return (
    <>
      {dialogsStore.sortedDialogs.map(dialog => <NavLink className={s.dialog} to={`/dialogs/${dialog._id}`} key={dialog._id}>
        <img className={s.photoDialog} src={photo} alt="photoDialog" />
        <div className={s.dataDialog}>
          <h4 className={s.nameTalk}>{dialog.nameTalk}</h4>
          <p className={s.dataMessage}>
            {new Date(+dialog.messages[dialog.messages.length - 1]?.date).toLocaleDateString() + ' ' + new Date(+dialog.messages[dialog.messages.length - 1]?.date).toLocaleTimeString()}
          </p>
          <p className={s.lastMessage}>{dialog.messages[dialog.messages.length - 1]?.text}</p>
        </div>
      </NavLink>)}
    </>
  )
})