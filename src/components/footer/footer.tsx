import React, { useState } from 'react'
import s from './footer.module.scss'
import home from '../../images/menuIcon/home.svg'
import person from '../../images/menuIcon/person.svg'
import cell from '../../images/menuIcon/cell.svg'
import chat from '../../images/menuIcon/chat.svg'
import setting from '../../images/menuIcon/setting.svg'
import homeActive from '../../images/menuIcon/homeActive.svg'
import personActive from '../../images/menuIcon/personActive.svg'
import cellActive from '../../images/menuIcon/cellActive.svg'
import chatActive from '../../images/menuIcon/chatActive.svg'
import settingActive from '../../images/menuIcon/settingActive.svg'
import { useIsLoadingPage } from '../../hooks/use-is-loading-page'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../store/auth-store'

export const Footer = () => {
  const isLoadingPage = useIsLoadingPage()
  const [activeLink, setActiveLink] = useState('Home')
  const [pos, setPos] = useState(10)
  const user = authStore.user

  return (
    <div className={s.footer}>
      <div className={s.containerFooter}>
        <div className={s.text}>Footer</div>
      </div>
      {isLoadingPage &&
      <div className={s.containerMenu}>
        <div className={`${s.list} ${activeLink === 'Home' ? `${s.active}` : ''}`}>
          <NavLink className={s.link} to="/news" onClick={() => {
            setActiveLink('Home')
            setPos(10)
          }}>
            <img className={s.icon} src={activeLink === 'Home' ? homeActive : home} alt="Home" />
            <span className={s.text}>Home</span>
          </NavLink>
        </div>
        <div className={`${s.list} ${activeLink === 'Profile' ? `${s.active}` : ''}`}>
          <NavLink className={s.link} to={`/${user?.login}`} onClick={() => {
            setActiveLink('Profile')
            setPos(30)
          }}>
            <img className={s.icon} src={activeLink === 'Profile' ? personActive : person} alt="Profile" />
            <span className={s.text}>Profile</span>
          </NavLink>
        </div>
        <div className={`${s.list} ${activeLink === 'Cell' ? `${s.active}` : ''}`}>
          <NavLink className={s.link} to={`/${user?.login}/gallery`} onClick={() => {
            setActiveLink('Cell')
            setPos(50)
          }}>
            <img className={s.icon} src={activeLink === 'Cell' ? cellActive : cell} alt="Cell" />
            <span className={s.text}>Cell</span>
          </NavLink>
        </div>
        <div className={`${s.list} ${activeLink === 'Chat' ? `${s.active}` : ''}`}>
          <NavLink className={s.link} to={`/${user?.login}/message/${user?.login}`} onClick={() => {
            setActiveLink('Chat')
            setPos(70)
          }}>
            <img className={s.icon} src={activeLink === 'Chat' ? chatActive : chat} alt="Chat" />
            <span className={s.text}>Chat</span>
          </NavLink>
        </div>
        <div className={`${s.list} ${activeLink === 'Setting' ? `${s.active}` : ''}`}>
          <NavLink className={s.link} to={`/${user?.login}/setting`} onClick={() => {
            setActiveLink('Setting')
            setPos(90)
          }}>
            <img className={s.icon} src={activeLink === 'Setting' ? settingActive : setting} alt="Setting" />
            <span className={s.text}>Setting</span>
          </NavLink>
        </div>
        <div className={s.slider} style={{ left: `${pos}%` }}/>
      </div>
      }
    </div>
  )
}