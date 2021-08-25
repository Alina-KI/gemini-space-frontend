import React from 'react'
import s from './my-page.module.css'
import avatar from '../../../images/1.jpg'
import { NavLink } from 'react-router-dom'
import { Gallery } from './gallery/gallery'
import { Comments } from './comments/comments'
// import { authStore, UserLoginType } from '../../../store/auth-store'

export const MyPage = () => {
  // const user = authStore.user as UserLoginType
  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }} />
        <div className={s.name_data}>
          <NavLink to="/user/:pk" className={s.NameUser}>Alis Red</NavLink>
          <p className={s.TextDate}>Date of Birth: 20.06.2002</p>
        </div>
      </div>
      <Gallery />
      <div style={{ marginLeft: '10px' }}>
        <Comments text={'Hi'} />
        <Comments text={'Hello'} />
        <Comments text={'Red'} />
        <Comments text={'Hi'} />
        <Comments text={'Однако лучшим подходом является использование только изображения, ' +
        'центрированного внутри элемента div , который имеет подходящее фоновое изображение, ' +
        'повторяющееся по горизонтали. Фоновое изображение будет представлять собой кусок того же ' +
        'цвета, что и общий фон страницы, но с горизонтальной линией посередине.'} />
      </div>
    </div>
  )
}