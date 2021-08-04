import React from 'react'
import s from './registration.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'

type Registration = {
  login: string
  password: string
  email: string
  phone: number
  name: string
  surname: string
  age: number
}

export const Registration = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Registration>()
  const onSubmit: SubmitHandler<Registration> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
      <div className={s.textInput}>
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
      <div className={s.textInput}>
        <p>Surname:</p>
        <div className={s.inputError}>
          <input
            {...register('surname', {
              required: { value: true, message: 'This field is required' },
              maxLength: { value: 100, message: 'Login cannot exceed 100 characters' }
            })}
            type="text" placeholder="Login" />
          {errors?.surname &&
          <p className={s.error}>* {errors.surname.message} </p>}
        </div>
      </div>
      <div className={s.textInput}>
        <p>Email:</p>
        <div className={s.inputError}>
          <input
            {...register('email', {
              required: { value: true, message: 'This field is required' },
              pattern: { value: /^\S+@\S+$/i, message: 'The email is not in the correct format' }
            })}
            type="text" placeholder="john@gmail.com" />
          {errors?.email &&
          <p className={s.error}>* {errors.email.message} </p>}
        </div>
      </div>
      <div className={s.textInput}>
        <p>Phone:</p>
        <div className={s.inputError}>
          <input
            {...register('phone', {
              required: { value: true, message: 'This field is required' },
              minLength: { value: 6, message: 'Phone cannot be less than 6 characters' },
              maxLength: { value: 12, message: 'Phone cannot exceed 12 characters' },
              pattern: { value: /^\d{3}\d{3}\d{4}/i, message: 'The number phone is not in the correct format' }
            })}
            type="text" placeholder="1302461037" />
          {errors?.phone &&
          <p className={s.error}>* {errors.phone.message} </p>}
        </div>
      </div>
      <div className={s.textInput}>
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
      <div className={s.textInput}>
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
      <button type="submit">Registration</button>
    </form>
  )
}