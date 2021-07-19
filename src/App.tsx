import React from 'react'
import s from './app.module.scss'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Routes } from './routes'

export const App = () => {
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Header />
        <div className={s.container}>
          <Navbar />
          <div className={s.routeContainer}>
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
      {/*1000px burger-menu*/}
    </BrowserRouter>
  )
}