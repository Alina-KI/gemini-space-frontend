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
import appGallery from '../../images/footer/appGallery.svg'
import appStore from '../../images/footer/appStore.svg'
import googlePlay from '../../images/footer/googlePlay.svg'
import windowsStore from '../../images/footer/windowsStore.svg'
import { useIsLoadingPage } from '../../hooks/use-is-loading-page'
import { NavLink } from 'react-router-dom'
import { authStore } from '../../store/auth-store'
import { observer } from 'mobx-react-lite'
import { newsStore } from '../../store/news-store'

export const Footer = observer(() => {
  const isLoadingPage = useIsLoadingPage()
  const [activeLink, setActiveLink] = useState('Home')
  const [pos, setPos] = useState(10)
  const user = authStore.user

  return (
    <div className={s.footer}>
      <div className={s.containerFooter}>
        <div className={`${!isLoadingPage || newsStore.isLoading ? `${s.footer__show}` : ''} ${s.footer__subscribe}`}>
          <h1 className={s.title}>Subscribe</h1>
          <p className={s.description}>Subscribe to stay tuned for new web design and latest updates. Let's do it!</p>
          <form className={s.subscribe__form}>
            <input className={s.subscribe__form_input} type="text" placeholder="Enter your email Address"/>
            <button className={s.subscribe__form_button}>Subscribe</button>
          </form>
        </div>
        <div className={`${!isLoadingPage || newsStore.isLoading ? `${s.footer__show}` : ''} ${s.footer__menu}`}>
          <NavLink className={s.footer__menu_link} to="/news">Github</NavLink>
          <NavLink className={s.footer__menu_link} to="/news">Twitter</NavLink>
          <NavLink className={s.footer__menu_link} to="/news">Telegram</NavLink>
          <NavLink className={s.footer__menu_link} to="/news">Vk</NavLink>
        </div>
        <div className={`${!isLoadingPage || newsStore.isLoading ? `${s.footer__show}` : ''} ${s.footer__icon}`}>
          <img className={s.footer__icon_image} src={googlePlay} alt="icon" />
          <img className={s.footer__icon_image} src={appStore} alt="icon" />
          <img className={s.footer__icon_image} src={appGallery} alt="icon" />
          <img className={s.footer__icon_image} src={windowsStore} alt="icon" />
        </div>
        <div className={s.footer__info}>
          <p className={s.footer__logo}>Gemini Space</p>
          <p className={s.footer__text}>© 2022 All Rights Reserved</p>
        </div>
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
})