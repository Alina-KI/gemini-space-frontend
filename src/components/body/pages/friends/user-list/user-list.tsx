import React from 'react'
import s from './user-list.module.scss'
import { useUsers } from '../../../../../hooks/use-users'
import { Loader } from '../../../../shared/loader/loader'

export const UserList = () => {
  const { users, isLoading, error } = useUsers()

  if (isLoading) return <Loader />
  if (error) return <div>{error}</div>

  return (
    <div className={s.usersContainer}>
      {users.map(user =>
        <div key={user._id} className={s.user}>
          <div>{user.surname} {user.name} {user.lastname}</div>
          {user.town}
        </div>
      )}
    </div>
  )
}