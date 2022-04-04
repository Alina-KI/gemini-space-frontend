import React from 'react'
import s from './friends.module.scss'
import avatar2 from '../../../images/1.jpg'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../store/auth-store'
// import { UserList } from './user-list/user-list'

export const Friends = observer(() => {
  const user = authStore.user
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink className={s.link} to={`/${user?.login}/friends`}>Friends</NavLink>
        <NavLink className={s.link} to="/find-friends">Find friends</NavLink>
      </div>
      {/*<UserList />*/}

      <div className={s.card}>
        <img className={s.img} src={avatar2} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
        </div>
      </div>
    </div>
  )
})