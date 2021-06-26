import React from 'react'
import s from './comments.module.css'
import ava from '../../../../../images/13.jpg'

type Props = {
  text: string
}

export const Comments = (props: Props) => {
  return (
    <div className={s.comments}>
      <div className={s.comment}>
        <div className={s.infAva}>
          <div className={s.ava} style={{ backgroundImage: `url("${ava}")` }}> </div>
          <p className={s.avaName}>Name</p>
        </div>
        <div className={s.text}>{props.text}</div>
      </div>
    </div>
  )
}