import React from 'react'
import s from './loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.heart}>
        <div>.</div>
      </div>
    </div>
  )
}