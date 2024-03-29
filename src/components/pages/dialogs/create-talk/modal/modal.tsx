import React, { useEffect } from 'react'
import s from './modal.module.scss'
import { userStore } from '../../../../../store/users-store'
import { SetState } from '../../../../../types/set-state'
import { observer } from 'mobx-react-lite'
import { ReactComponent as Cross } from '../../../../../images/cross.svg'
import { ReactComponent as Tracery } from '../../../../../images/ornaments-for-comments/tracery.svg'
import { NavLink } from 'react-router-dom'
import { usersTalkStore } from '../../../../../store/users-talk-store'

type Props = {
  isOpen: boolean
  setIsOpen: SetState<boolean>
}

export const Modal = observer(({ isOpen, setIsOpen }: Props) => {
  useEffect(() => {
    userStore.fetchMyFriends().then()
  }, [])

  return (
    <>
      {
        isOpen &&
        <div className={s.modalAdded}>
          <button className={s.cross} onClick={() => setIsOpen(false)}>
            <Cross className={s.crossPhoto} />
          </button>
          {userStore.users.map(user =>
            <div className={s.cartUser} key={user._id}>
              <img className={s.photoUser} src={user.avatar} alt="" />
              <div className={s.containerName}>
                <NavLink to={`/${user.login}`} className={s.nameUser}>
                  {user.surname} {user.name} {user.lastname}
                </NavLink>
              </div>
              <button className={s.addedUser} disabled={!!usersTalkStore.users.find(u => u._id === user._id)}
                onClick={() => {
                  usersTalkStore.addedUsers(user)
                  setIsOpen(false)
                }}>Append
              </button>
              <div className={s.bottomLine}>
                <div className={s.separation}>
                  <hr className={s.line} />
                  <Tracery className={s.tracery} />
                  <hr className={s.line} />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  )
})