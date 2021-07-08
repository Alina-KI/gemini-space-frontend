import React from 'react'
import s from './app.module.scss'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/header/header'
import { Navbar } from './components/navbar/navbar'
import { Body } from './components/body/body'
import { Footer } from './components/footer/footer'

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className={s.container}>
          <Navbar />
          <Body />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}