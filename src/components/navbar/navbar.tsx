import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './navbar.module.scss'

type Props = {
  setIsActive:  React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ setIsActive }: Props) => {
  return (
    <ul className={s.container}>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/user/:pk">GS Page</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/news">News for GS</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/message">Message</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/friends">Friends</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/community">Community</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/gallery">Gallery</NavLink></li>
      <li className={s.component}><NavLink onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/music">Music for GS</NavLink></li>
    </ul>
  )
}