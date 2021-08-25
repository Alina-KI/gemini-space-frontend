import React from 'react'
import s from './auth.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from '../../shared/loader/loader'
import { authStore } from '../../../store/auth-store'
import { useHistory } from 'react-router-dom'
import { ErrorDisplay } from '../../shared/error-display/error-display'

export type Auth = {
  login: string
  password: string
  name: string
  email: string
}


export const AuthPage = () => {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm<Auth>()
  const onSubmit: SubmitHandler<Auth> = data => {
    // console.log(data)
    authStore.login(data).then(() => history.push('/user'))
  }

  if (authStore.isLoading) return <Loader />
  if (authStore.error !== '') return <ErrorDisplay message={authStore.error}/>

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
            type="text" placeholder="Login" />
          {errors?.login &&
          <p className={s.error}>* {errors.login.message} </p>}
        </div>
      </div>
      <div>
        <p>Name:</p>
        <div className={s.inputError}>
          <input
            {...register('name', {
              required: { value: true, message: 'This field is required' },
              maxLength: { value: 100, message: 'Login cannot exceed 100 characters' }
            })}
            type="text" placeholder="Name" />
          {errors?.name &&
          <p className={s.error}>* {errors.name.message} </p>}
        </div>
      </div>
      <div>
        <p>Email:</p>
        <div className={s.inputError}>
          <input
            {...register('email', {
              required: { value: true, message: 'This field is required' }
            })}
            type="text" placeholder="Email" />
          {errors?.email &&
          <p className={s.error}>* {errors.email.message} </p>}
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