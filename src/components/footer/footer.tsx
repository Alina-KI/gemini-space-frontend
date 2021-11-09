import React from 'react'
import s from './footer.module.scss'
import home from '../../images/menuIcon/home.svg'
import person from '../../images/menuIcon/person.svg'
import cell from '../../images/menuIcon/cell.svg'
import chat from '../../images/menuIcon/chat.svg'
import setting from '../../images/menuIcon/setting.svg'

export const Footer = () => {
  return (
    <div className={s.footer}>
      <div className={s.containerFooter}>
        Footer
      </div>
      <div className={s.containerMenu}>
        <div className={s.list}>
          <a className={s.link} href="#">
            <img className={s.icon} src={home} alt="Home" />
            Home
          </a>
        </div>
        <div className={s.list}>
          <a className={s.link} href="#">
            <img className={s.icon} src={person} alt="Person" />
            Person
          </a>
        </div>
        <div className={s.list}>
          <a className={`${s.link} ${s.cell}`} href="#">
            <img className={s.icon} src={cell} alt="Cell" />
          </a>
        </div>
        <div className={s.list}>
          <a className={s.link} href="#">
            <img className={s.icon} src={chat} alt="Chat" />
            Chat
          </a>
        </div>
        <div className={s.list}>
          <a className={s.link} href="#">
            <img className={s.icon} src={setting} alt="Setting" />
            Setting
          </a>
        </div>
      </div>
    </div>
  )
}