import React, { useEffect, useState } from 'react'
import s from './header.module.scss'
import logo from '../../images/logo.svg'
import { NavLink } from 'react-router-dom'
import { Navbar } from '../navbar/navbar'
import { authStore } from '../../store/auth-store'
import { useIsLoadingPage } from '../../hooks/use-is-loading-page'
import { observer } from 'mobx-react-lite'
// import sun from '../../images/light-night/sun.svg'
// import moon from '../../images/light-night/moon.svg'

export const Header = observer(() => {
  const [nameProject, setNameProject] = useState('GS')
  const [settingText, setSettingText] = useState('What are you looking for?')
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [isActive, setIsActive] = useState(false)
  const isLoadingPage = useIsLoadingPage()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isLoadingPage)
    {
      if (width && width <= 860) setNameProject('GS')
      if (width && width > 860) setNameProject('Gemini Space')
    }
    else setNameProject('Gemini Space')
    if (width && width <= 700) setSettingText('Search')
    if (width && width > 700) setSettingText('What are you looking for?')
  }, [width])

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        {isLoadingPage &&
        <button className={s.burger_menu} onClick={() => {
          setIsActive(isActive => !isActive)
        }}>
          <svg className={`${s.ham} ${isActive ? `${s.active}` : ''}`} viewBox="0 0 100 100">
            <path className={`${s.line} ${s.top}`}
              d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568" />
            <path className={`${s.line} ${s.middle}`}
              d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7" />
            <path className={`${s.line} ${s.bottom}`}
              d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0" />
          </svg>
        </button>}
        {isActive && <div onClick={() => setIsActive(false)} className={s.active_background} />}
        <div className={`${s.menu} ${isActive && s.active_menu}`}>
          <div className={s.navbar_search__container}>
            <input className={s.navbar_search__input} type="text" placeholder="Search" />
          </div>
          <div className={s.navbar}>
            <Navbar setIsActive={setIsActive} />
          </div>
        </div>
        <div className={s.logo_name}>
          <NavLink to={`/${authStore.user?.login}`}><img className={s.logo} src={logo} alt="Logo" /></NavLink>
          <span className={s.header_name_project}><NavLink to={`/${authStore.user?.login}`}>{nameProject}</NavLink></span>
        </div>
        {isLoadingPage &&
        <div className={s.search}>
          <input type="text" className={s.searchTerm} placeholder={settingText} />
          <button type="submit" className={s.searchButton}>
            <img
              src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E"
              alt="" />
          </button>
        </div>}
        {authStore.user === null ?
          <div className={s.login}><NavLink to="/auth">Login</NavLink></div>
          :
          <div><span className={s.login_name}><NavLink to={`/${authStore.user.login}`}>{authStore.user.name} {authStore.user.surname}</NavLink></span>
            <NavLink to={`/${authStore.user.login}`}>
              <img className={s.login_logo} src={authStore.user?.avatar} alt="Avatar" />
            </NavLink>
          </div>
        }
      </div>
    </header>
  )
})