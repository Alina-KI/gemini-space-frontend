import React from 'react'
import s from './user-list.module.scss'
import { useUsers } from '../../../../hooks/use-users'
import { Loader } from '../../../shared/loader/loader'
import avatar from '../../../../images/17.jpg'
import { ErrorDisplay } from '../../../shared/error-display/error-display'

export const UserList = () => {
  const { users, isLoading, error } = useUsers()

  if (isLoading) return <Loader />
  if (error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      {users.map(user =>
        <div key={user._id} className={s.user}>
          <div className={s.userAvatar}>
            <div>{user.surname} {user.name} {user.lastname}</div>
            <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }}/>
          </div>
          <div className={s.town}>{user.town}</div>
        </div>
      )}
    </div>
  )
}