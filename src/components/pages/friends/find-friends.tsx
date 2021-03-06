import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import s from './friends.module.scss'
import { NavLink } from 'react-router-dom'
import { userStore } from '../../../store/users-store'
import { UserList } from './user-list/user-list'

export const FindFriends = observer(() => {

  useEffect(() => {
    userStore.fetchNotMyFriends().then()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink className={s.link} to={`/${authStore.user?.login}/friends`}>Friends</NavLink>
        <NavLink activeClassName={s.activeLink} className={s.link} to="/find-friends">Find friends</NavLink>
      </div>
      <UserList users={userStore.users} isLoading={userStore.isLoading} error={null} showAddFriendButton={true} />
    </div>
  )
})
