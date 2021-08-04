import React from 'react'
import s from './header.module.scss'
import logo from '../../images/logo.svg'
import avatar from '../../images/1.jpg'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <div className={s.logo_name}>
          <NavLink to="/user/:pk"><img className={s.logo} src={logo} alt="Logo"/></NavLink>
          <span className={s.header_name_project}><NavLink to="/user/:pk">Gemini Space</NavLink></span>
        </div>
        <div className={s.search}>
          <input type="text" placeholder="Search..." className={s.header_search}/>
        </div>
        <div className={s.login}>
          <span className={s.login_name}><NavLink to="/registration">Alis</NavLink></span>
          <NavLink to="/user/:pk">
            <div className={s.login_logo} style={{ backgroundImage: `url("${avatar}")` }}/>
          </NavLink>
        </div>
      </div>
    </header>
  )
}