import React  from 'react'
import s from './mini-gallery.module.scss'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../../../store/auth-store'

export const MiniGallery = () => {
  const user = authStore.user

  return (
    <div className={s.gallery}>
      <NavLink to={`/${user?.login}/gallery`} className={s.whole_gallery}>Gallery</NavLink>
      {user?.imageFiles?.slice(user?.imageFiles?.length - 4).map(photo =>
        <button className={s.gallery_photo} key={photo} style={{ backgroundImage: `url("${photo}")` }}/>
      )}
    </div>
  )
}