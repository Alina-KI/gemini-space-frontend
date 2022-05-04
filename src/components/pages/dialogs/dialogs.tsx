import React from 'react'
import { observer } from 'mobx-react-lite'
import { dialogsStore } from '../../../store/dialogs-store'
import { NavLink } from 'react-router-dom'
import { toJS } from 'mobx'

export const Dialogs = observer(() => {
  // console.log(toJS(dialogsStore.dialogs))
  return (
    <div>
      {dialogsStore.dialogs.map(dialog => <NavLink to={`/dialogs/${dialog._id}`} key={dialog._id}>
        <h5>{dialog.nameTalk}</h5>
      </NavLink>)}
    </div>
  )
})