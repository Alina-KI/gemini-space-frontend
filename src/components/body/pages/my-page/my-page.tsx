import React from 'react'
import s from './my-page.module.css'
import avatar from '../../../../images/1.jpg'
import { NavLink } from 'react-router-dom'
import { Gallery } from './gallery/gallery'
import { Comments } from './comments/comments'

export const MyPage = () => {
  return (
    <div className={s.myPage}>
      <div className={s.container}>
        <div className={s.avatar} style={{ backgroundImage: `url("${avatar}")` }}/>
        <div className={s.name_data}>
          <NavLink to="/user/:pk" className={s.NameUser}>Alis Red</NavLink>
          <p className={s.TextDate}>Date of Birth: 20.06.2002</p>
        </div>
      </div>
      <Gallery/>
      <div className={s.comment}>
        <Comments text={'Hi'}/>
        <Comments text={'Hello'}/>
        <Comments text={'Red'}/>
        <Comments text={'Hi'}/>
      </div>
    </div>
  )
}