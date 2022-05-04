import React from 'react'
import s from './user-list.module.scss'
import { Loader } from '../../../shared/loader/loader'
import { ErrorDisplay } from '../../../shared/error-display/error-display'
import { User } from '../../../../types/user'
import { userStore } from '../../../../store/users-store'
import { dialogsStore } from '../../../../store/dialogs-store'
import { NavLink, useHistory } from 'react-router-dom'
import avatar1 from '../../../../images/11.jpg'

type Props = {
  users: User[]
  isLoading: boolean
  error: string | null
  showAddFriendButton: boolean
}

export const UserList = ({ users, isLoading, error, showAddFriendButton }: Props) => {
  const history = useHistory()

  if (isLoading) return <Loader />
  if (error) return <ErrorDisplay message={'Error'} />

  const writeMessage = (userLogin: string) => {
    dialogsStore.createDialog({ anotherUserLogin: userLogin })
      .then(dialog => {
        console.log(dialog)
        history.push(`/dialogs/${dialog._id}`)
      })
  }

  return (
    <div className={s.container}>
      {users.length === 0
        ?
        <div>
          0 friends
        </div>
        : users.map(user =>
          <div key={user._id} className={s.card}>
            <img className={s.img} src={avatar1} alt="avatar" />
            <div className={s.info}>
              <NavLink to={`/${user.login}`} className={s.nameUser}>{user.surname} {user.name} {user.lastname}</NavLink>
              <span className={s.date}>Date of Birth: 25.12.2000</span>
              <span className={s.town}>Town: Moscow</span>
              <div className={s.containerButton}>
                <button onClick={() => writeMessage(user.login)} className={s.button}>Write message</button>
                {showAddFriendButton
                  ?
                  <button onClick={() => userStore.addToFriends(user)} className={s.button}>Add friends</button>
                  :
                  <button onClick={() => userStore.removeFromFriends(user)} className={s.button}>Remove friends</button>
                }
              </div>
            </div>
          </div>
        )}
    </div>
  )
}