import React, { useEffect, useRef } from 'react'
import s from './app.module.scss'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Routes } from './routes'
import { newsStore } from './store/news-store'
import { authStore } from './store/auth-store'
import { useIsLoadingPage } from './hooks/use-is-loading-page'
import { useRefDimensions } from './hooks/use-ref-dimensions'
import { dialogsStore } from './store/dialogs-store'
import { socketStore } from './store/socket-store'

export const App = () => {
  useEffect(() => {
    authStore.checkAuth().then(() => {
      socketStore.openSocket()
      dialogsStore.getMyDialogs()
    })
  }, [])

  const isLoadingPage = useIsLoadingPage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useRefDimensions(containerRef)

  return (
    <div className={s.app}>
      <Header />
      <div className={`${s.container} ${!isLoadingPage ? s.container_auth : ''}`}>
        {isLoadingPage &&
        <div className={s.navbar}>
          {!newsStore.isLoading && <Navbar setIsActive={() => null} />}
        </div>}
        <div ref={containerRef} className={s.routeContainer}>
          <Routes />
        </div>
      </div>
      <Footer smallAppHeight={height < 700} />
    </div>
  )
}