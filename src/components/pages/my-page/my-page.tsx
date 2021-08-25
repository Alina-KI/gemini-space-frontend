import React from 'react'
import s from './my-page.module.css'
import avatar from '../../../images/1.jpg'
import { NavLink } from 'react-router-dom'
import { Gallery } from './gallery/gallery'
import { Comments } from './comments/comments'
import { authStore, UserLoginType } from '../../../store/auth-store'

export const MyPage = () => {
  const user = authStore.user as UserLoginType
  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }} />
        <div className={s.name_data}>
          <NavLink to="/user/:pk" className={s.NameUser}>{user.name} {user.surname} {user.lastname}</NavLink>
          <p className={s.TextDate}>Date of Birth: {user.dateOfBirth}</p>
          <p className={s.TextDate}>Town: {user.town}</p>
        </div>
      </div>
      <Gallery />
      <div style={{ marginLeft: '10px' }}>
        <Comments text={'Hi'} />
        <Comments text={'Hello'} />
        <Comments text={'Red'} />
        <Comments text={'Hi'} />
        <Comments text={'Be honorable.Never yearn the lover, for you cannot feel it.'} />
      </div>
    </div>
  )
}