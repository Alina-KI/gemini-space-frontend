import React, { useEffect, useState } from 'react'
import s from './app.module.scss'
import { useLocation } from 'react-router-dom'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Routes } from './routes'
import { authStore } from './store/auth-store'
import { newsStore } from './store/news-store'

export const App = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    setIsLoadingPage(pathname !== '/auth' && pathname !== '/registration')
  }, [location])

  return (
    <div className={s.app}>
      <Header />
      <div className={s.container}>
        {isLoadingPage &&
        <div className={s.navbar}>
          { !newsStore.isLoading && <Navbar setIsActive={() => null} />}
        </div>}
        <div className={s.routeContainer}>
          <Routes />
        </div>
      </div>
      <Footer />
    </div>
  )
}