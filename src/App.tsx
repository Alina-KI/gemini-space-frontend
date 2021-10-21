import React, { useEffect, useState } from 'react'
import s from './app.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Routes } from './routes'
import { newsStore } from './store/news-store'
import { authStore } from './store/auth-store'
import jwtDecode from 'jwt-decode'

export const App = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    setIsLoadingPage(pathname !== '/auth' && pathname !== '/registration')
  }, [location])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const a: string | null = localStorage.getItem('user')
      if (a !== null) {
        authStore.user = jwtDecode(a)
      }
    }
  })

  return (
    <div className={s.app}>
      <Header />
      <div className={s.container}>
        {isLoadingPage &&
        <div className={s.navbar}>
          {!newsStore.isLoading && <Navbar setIsActive={() => null} />}
        </div>}
        <div className={s.routeContainer}>
          <Routes />
        </div>
      </div>
      <Footer />
    </div>
  )
}