import React, { useEffect, useState } from 'react'
import s from './registration.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import { authStore } from '../../store/auth-store'
import { GoogleLogin } from 'react-google-login'
import GitHubLogo from '../../images/icon/Octocat.png'

export type Registration = {
  name: string
  surname: string
  lastname?: string
  dateOfBirth?: string
  phone?: number
  town?: string
  login: string
  email: string
  password: string
}

export const Registration = () => {
  const [googleText, setGoogleText] = useState('Sign in with Google')
  const [width, setWidth] = useState<number | undefined>(undefined)
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm<Registration>()
  const onSubmit: SubmitHandler<Registration> = data => {
    authStore.registration(data).then(() => history.push(`/${data.login}`))
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (width && width <= 400) setGoogleText('Google')
    if (width && width > 400) setGoogleText('Sign in with Google')
  }, [width])

  const responseGoogle = async (response:any) => {
    const GoogleAuth = {
      login: response.profileObj.googleId,
      password: response.profileObj.googleId,
      name: response.profileObj.givenName,
      surname: response.profileObj.familyName,
      email: response.profileObj.email,
      // imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gg_u7Z7ST_Nhu05ug1-Q31WmP2IzgoMfAf6iLAn=s96-c"
    }
    if (await authStore.IsRegistration(GoogleAuth))
      await authStore.registration(GoogleAuth)
    await authStore.login(GoogleAuth)
    history.push(`/${GoogleAuth.login}`)
  }
  const GithubClick = () => {
    // authStore.github()
  }

  return (
    <div className={s.registration}>
      <div className={s.loginGoogleGitHub}>
        <GoogleLogin
          className={s.googleButton}
          buttonText={googleText}
          clientId="875195926748-910se1ht939mu3pcvg4ndn4dsef46ume.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <div className={s.github}>
          <button className={s.githubButton} onClick={GithubClick}>
            <img className={s.githubLogo} src={GitHubLogo} alt="GitHub" />
            GitHub
          </button>
        </div>
      </div>
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
          <p>Lastname:</p>
          <div className={s.inputError}>
            <input {...register('lastname')} type="text" placeholder="Lastname" />
          </div>
        </div>
        <div className={s.textInput}>
          <p>Date of Birth:</p>
          <div className={s.inputError}>
            <input className={s.date_of_birth}
              {...register('dateOfBirth')}
              type="date" min="1990-01-01" max="2021-12-31" />
            {errors?.dateOfBirth &&
            <p className={s.error}>* {errors.dateOfBirth.message} </p>}
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
          <p>Town:</p>
          <div className={s.inputError}>
            <input {...register('town')} type="text" placeholder="town" />
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
                pattern: {
                  value: /^\d{3}\d{3}\d{4}/i,
                  message: 'The number phone is not in the correct format. Try to start the phone number with 8.'
                }
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
              type="password" placeholder="Password" />
            {errors?.password &&
            <p className={s.error}>* {errors.password.message} </p>}
          </div>
        </div>
        <div className={s.textInput}>
          <p>Repeat password:</p>
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
        <button className={s.b_registration} type="submit">Create</button>
        <div className={s.div_link}>
          <NavLink className={`${s.link} ${s.link_registration}`} to="/registration">Create account</NavLink>
          /
          <NavLink className={`${s.link} ${s.link_auth}`} to="/auth">Log in</NavLink>
        </div>
      </form>
    </div>
  )
}