import React from 'react'
import { observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import s from './friends.module.scss'
import { NavLink } from 'react-router-dom'
import avatar1 from '../../../images/11.jpg'

export const FindFriends = observer(() => {
  const user = authStore.user
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      <div className={s.linkFriends}>
        <NavLink className={s.link} to={`/${user?.login}/friends`}>Friends</NavLink>
        <NavLink className={s.link} to="/find-friends">Find friends</NavLink>
      </div>

      <div className={s.card}>
        <img className={s.img} src={avatar1} alt="avatar" />
        <div className={s.info}>
          <span>Req Still</span>
          <span>Date of Birth: 25.12.2000</span>
          <span>Town: Moscow</span>
          <button className={s.addFriend}>Add friends</button>
        </div>
      </div>
    </div>
  )
})