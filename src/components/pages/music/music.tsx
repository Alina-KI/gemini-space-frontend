import React from 'react'
import s from './music.module.scss'
import { authStore } from '../../../store/auth-store'

export const Music = () => {
  return (
    <div className={s.container}>
      <audio className={s.audio} src="#" controls> </audio>
      {authStore.user?.audioFiles?.map(music =>
        <div key={music.path}>
          <div>{music.title}</div>
          <div>{music.path}</div>
        </div>
      )}
    </div>
  )
}