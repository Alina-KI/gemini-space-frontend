import React from 'react'
import s from './error-display.module.scss'

type Props = {
  code?: number
  message: string
}

export const ErrorDisplay = ({ code, message }: Props) => {
  return (
    <div className={s.container}>
      <h1>{code}</h1>
      <h2>{message}</h2>
    </div>
  )
}