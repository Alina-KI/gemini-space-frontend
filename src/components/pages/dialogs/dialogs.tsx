import React from 'react'
import { observer } from 'mobx-react-lite'
import { dialogsStore } from '../../../store/dialogs-store'
import { NavLink } from 'react-router-dom'

export const Dialogs = observer(() => {
  return (
    <div>
      {dialogsStore.dialogs.map(dialog => <NavLink to={`/dialogs/${dialog.id}`} key={dialog.id}>
        <h5>{dialog.nameTalk}</h5>
      </NavLink>)}
    </div>
  )
})