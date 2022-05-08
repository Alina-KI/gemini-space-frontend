import React from 'react'
import s from './dialogs.module.scss'
import photo from '../../../images/2.jpg'
import { observer } from 'mobx-react-lite'
import { dialogsStore } from '../../../store/dialogs-store'
import { NavLink } from 'react-router-dom'

export const Dialogs = observer(() => {
  return (
    <div>
      {dialogsStore.dialogs.map(dialog => <NavLink className={s.dialog} to={`/dialogs/${dialog._id}`} key={dialog._id}>
        <img className={s.photoDialog} src={photo} alt="photoDialog" />
        <div className={s.dataDialog}>
          <h4 className={s.nameTalk}>{dialog.nameTalk}</h4>
          <p className={s.dataMessage}>{dialog._id}</p>
          <p className={s.lastMessage}>{dialog._id}</p>
        </div>
      </NavLink>)}
    </div>
  )
})