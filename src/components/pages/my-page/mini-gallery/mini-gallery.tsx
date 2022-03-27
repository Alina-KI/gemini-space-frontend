import React  from 'react'
import s from './mini-gallery.module.scss'
import { NavLink } from 'react-router-dom'
import photo1 from '../../../../images/16.jpg'
import photo2 from '../../../../images/11.jpg'
import photo3 from '../../../../images/4.jpg'
import photo4 from '../../../../images/17.jpg'
import { authStore } from '../../../../store/auth-store'

export const MiniGallery = () => {
  const user = authStore.user

  return (
    <div className={s.gallery}>
      <NavLink to={`/${user?.login}/gallery`} className={s.whole_gallery}>Gallery</NavLink>
      <button className={s.gallery_photo} style={{ backgroundImage: `url("${photo1}")` }}/>
      <button className={s.gallery_photo} style={{ backgroundImage: `url("${photo2}")` }}/>
      <button className={s.gallery_photo} style={{ backgroundImage: `url("${photo3}")` }}/>
      <button className={s.gallery_photo} style={{ backgroundImage: `url("${photo4}")` }}/>
    </div>
  )
}