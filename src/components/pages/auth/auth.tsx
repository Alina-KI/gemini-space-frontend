import React from 'react'
import s from './auth.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader } from '../../shared/loader/loader'
import { authStore } from '../../../store/auth-store'
import { NavLink, useHistory } from 'react-router-dom'
import { ErrorDisplay } from '../../shared/error-display/error-display'
import { GoogleLogin } from 'react-google-login'
import GitHubLogo from '../../../images/icon/Octocat.png'

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

  const responseGoogle = async (response:any) => {
    // console.log(response.profileObj)
    const GoogleAuth = {
      login: response.profileObj.googleId,
      password: response.profileObj.googleId,
      name: response.profileObj.givenName,
      surname: response.profileObj.familyName,
      email: response.profileObj.email,
      // imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gg_u7Z7ST_Nhu05ug1-Q31WmP2IzgoMfAf6iLAn=s96-c"
    }
    await authStore.registration(GoogleAuth)
    await authStore.login(GoogleAuth)
    history.push('/user')
  }

  const GithubClick = () => {
    authStore.github()
  }

  return (
    <div className={s.auth}>
      <div className={s.loginGoogleGitHub}>
        <GoogleLogin
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
        <button type="submit" className={s.b_login}>Sign In</button>
        <div className={s.div_link}>
          <NavLink className={`${s.link} ${s.link_registration}`} to="/registration">Create account</NavLink>
          /
          <NavLink className={`${s.link} ${s.link_auth}`} to="/auth">Forgot password</NavLink>
        </div>
      </form>
    </div>
  )
}