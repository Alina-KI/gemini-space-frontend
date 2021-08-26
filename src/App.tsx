import React, { useEffect, useState } from 'react'
import s from './app.module.scss'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Routes } from './routes'

export const App = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  useEffect(() => {
    setIsLoadingPage(window.location.pathname !== '/auth' && window.location.pathname !== '/registration')
    console.log(isLoadingPage)
  }, [])
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Header />
        <div className={s.container}>
          {isLoadingPage &&
          <div className={s.navbar}>
            <Navbar setIsActive={() => { }} />
          </div>}
          <div className={s.routeContainer}>
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}