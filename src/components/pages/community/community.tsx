import React from 'react'
import s from './community.module.scss'
import photo from '../../../images/11.jpg'
import { NavLink } from 'react-router-dom'
import { newsStore } from '../../../store/news-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { observer } from 'mobx-react-lite'

export const Community = observer(() => {
  if (newsStore.isLoading) return <Loader />
  if (newsStore.error) return <ErrorDisplay message={'Error'}/>

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img className={s.img} src={photo} alt="photo" />
        <div className={s.info}>
          <NavLink to="/" className={s.title}>Req Still</NavLink>
          <span>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
          <button className={s.addFriend}>Add friends</button>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={photo} alt="photo" />
        <div className={s.info}>
          <NavLink to="/" className={s.title}>Req Still</NavLink>
          <span>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex nisi, porro. Aperiam beatae doloremque eligendi facilis in iure non suscipit vitae! Aperiam atque cupiditate eius, explicabo inventore modi. Fugiat, veritatis.</span>
          <button className={s.addFriend}>Add friends</button>
        </div>
      </div>
      <div className={s.card}>
        <img className={s.img} src={photo} alt="photo" />
        <div className={s.info}>
          <NavLink to="/" className={s.title}>Req Still</NavLink>
          <span>Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eius pariatur quam, suscipit tempora </span>
          <button className={s.addFriend}>Add friends</button>
        </div>
      </div>
    </div>
  )
})