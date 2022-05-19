import React from 'react'
import s from './music.module.scss'

export const Music = () => {
  return (
    <div className={s.container}>
      <audio className={s.audio} src="#" controls></audio>
    </div>
  )
}