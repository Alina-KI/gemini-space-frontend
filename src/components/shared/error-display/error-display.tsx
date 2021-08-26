import React from 'react'
import s from './error-display.module.scss'

type Props = {
  code?: number
  message: string
}

export const ErrorDisplay = ({ code, message }: Props) => {
  return (
    <div className={s.container}>
      <h1 className={s.container_text}>Error {code}</h1>
      <h3 className={s.container_text}>{message}</h3>
      <div className={s.connect}>
        <div className={s.con}>
          <div className={s.image_browser}><div className={s.checked}> </div></div>
          <p className={s.who}>You</p>
          <p className={s.name_what}>Browse</p>
          <p className={s.success}>Working</p>
        </div>
        <div className={s.con}>
          <div className={s.image_cloud}><div className={s.checked}> </div></div>
          <p className={s.who}>Frankfurt</p>
          <p className={s.name_what}>Cloudflare</p>
          <p className={s.success}>Working</p>
        </div>
        <div className={s.con}>
          <div className={s.image_host}><div className={s.cross}> </div></div>
          <p className={s.who}>geminispace</p>
          <p className={s.name_what}>Host</p>
          <p className={s.error}>Error</p>
        </div>
      </div>
      <div className={s.container_text}>
        <div>
          <h4>What happened?</h4>
          <p>The wev server reported an invalid error.</p>
        </div>
        <div>
          <h4>What can I do?</h4>
          <p>Please try again a few minutes</p>
        </div>
      </div>
    </div>
  )
}