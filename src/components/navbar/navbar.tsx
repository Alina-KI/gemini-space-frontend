import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './navbar.module.scss'
import { authStore } from '../../store/auth-store'

type Props = {
  setIsActive:  React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ setIsActive }: Props) => {
  const user = authStore.user

  return (
    <ul className={s.container}>
      <li className={s.component}><NavLink activeClassName={s.elActive} exact={true} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={`/${user?.login}`}>GS Page</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/news">News for GS</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={'/dialogs'}>Message</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={`/${user?.login}/friends`}>Friends</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={`/${user?.login}/community`}>Community</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={`/${user?.login}/gallery`}>Gallery</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to="/music">Music for GS</NavLink></li>
      <li className={s.component}><NavLink activeClassName={s.elActive} onClick={()=>{ setIsActive(isActive => !isActive) }} className={s.el} to={`/${user?.login}/setting`}>Setting</NavLink></li>
    </ul>
  )
}