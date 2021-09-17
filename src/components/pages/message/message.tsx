import React from 'react'
import s from './message.module.scss'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export const Message = () => {
  return (
    <div className={s.container}>
      <ErrorDisplay code={502}
        message={'Bad request'}/>
      {/*<div className={s.message}>*/}
      {/*  <div className={s.name}>*/}
      {/*    dsafads*/}
      {/*  </div>*/}
      {/*  <div className={s.text}>*/}
      {/*    gres*/}
      {/*  </div>*/}
      {/*  <div className={s.data}>*/}
      {/*    20.02.2021*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}