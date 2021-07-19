import React from 'react'
import s from './auth.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'

type Auth = {
  login: string
  password: string
}

// const loginText = 'Login'
// const passwordText = 'Password'

export const AuthPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Auth>()
  const onSubmit: SubmitHandler<Auth> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
      <div>
        <p>Login:</p>
        <div className={s.inputError}>
          <input
            {...register('login', {
              required: { value: true, message: 'This field is required' },
              maxLength: { value: 100, message: 'Login cannot exceed 100 characters' }
            })}
            type="text" placeholder="Login"/>
          {errors?.login &&
          <p className={s.error}>* {errors.login.message} </p>}
        </div>
      </div>
      <div>
        <p>Password:</p>
        <div className={s.inputError}>
          <input
            {...register('password', {
              required: { value: true, message: 'This field is required' },
              maxLength: { value: 100, message: 'Password cannot exceed 100 characters' }
            })}
            type="text" placeholder="Password" />
          {errors?.password &&
          <p className={s.error}>* {errors.password.message} </p>}
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}