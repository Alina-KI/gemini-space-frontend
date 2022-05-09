import React, { useEffect } from 'react'
import s from './friends.module.scss'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../store/auth-store'
import { UserList } from './user-list/user-list'
import { userStore } from '../../../store/users-store'

export const Friends = observer(() => {
  const user = authStore.user

  useEffect(() => {
    userStore.fetchMyFriends().then()
  }, [])
  //TODO: Зайти на страницу друзей и смотреть на query

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink activeClassName={s.activeLink} className={s.link} to={`/${user?.login}/friends`}>Friends</NavLink>
        <NavLink className={s.link} to="/find-friends">Find friends</NavLink>
      </div>
      <UserList users={userStore.users} isLoading={userStore.isLoading} error={null} showAddFriendButton={false} />
    </div>
  )
})