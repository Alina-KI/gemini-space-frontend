import React from 'react'
import s from './gallery.module.scss'
import { NavLink } from 'react-router-dom'
import photo1 from '../../../../images/16.jpg'
import photo2 from '../../../../images/11.jpg'
import photo3 from '../../../../images/4.jpg'
import photo4 from '../../../../images/17.jpg'

export const Gallery = () => {
  return (
    <div className={s.gallery}>
      <NavLink to="/gallery" className={s.whole_gallery}>Gallery</NavLink>
      <NavLink to="/gallery/photo/:pk" className={s.gallery_photo} style={{ backgroundImage: `url("${photo1}")` }}/>
      <NavLink to="/gallery/photo/:pk" className={s.gallery_photo} style={{ backgroundImage: `url("${photo2}")` }}/>
      <NavLink to="/gallery/photo/:pk" className={s.gallery_photo} style={{ backgroundImage: `url("${photo3}")` }}/>
      <NavLink to="/gallery/photo/:pk" className={s.gallery_photo} style={{ backgroundImage: `url("${photo4}")` }}/>
    </div>
  )
}