import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import s from './friends.module.scss'
import { NavLink, useHistory } from 'react-router-dom'
import avatar1 from '../../../images/11.jpg'
import { dialogsStore } from '../../../store/dialogs-store'
import { userStore } from '../../../store/users-store'
import { UserList } from './user-list/user-list'

export const FindFriends = observer(() => {

  const history = useHistory()

  useEffect(() => {
    userStore.fetchNotMyFriends().then()
  }, [])

  // if (userStore.isLoading) return <Loader />

  const user = authStore.user

  const writeMessage = (dialogId: string) => {
    dialogsStore.createDialog({ anotherUserId: dialogId })
      .then(() => history.push(dialogId))
  }

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink className={s.link} to={`/${user?.login}/friends`}>Friends</NavLink>
        <NavLink className={s.link} to="/find-friends">Find friends</NavLink>
      </div>
      <UserList users={userStore.users} isLoading={userStore.isLoading} error={null} showAddFriendButton={true} />
    </div>
  )
})
