import { makeAutoObservable, toJS } from 'mobx'
import { Auth } from '../components/auth/auth'
import { Registration } from '../components/registration/registration'
import { api } from '../api'
import jwtDecode from 'jwt-decode'
import { Dialog } from '../types/message'
import { User } from '../types/user'
import { FileType } from '../types/file-type'

export type UserLoginType = {
  name: string
  surname: string
  lastname?: string
  dateOfBirth?: string
  phone?: number
  town?: string
  avatar?: string
  login: string
  email: string
  imageFiles?: string[]
  audioFiles?: FileType[]
  videoFiles?: string[]
  friends?: User[]
}

class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  user = null as null | UserLoginType
  isLoading = false
  error = ''

  registration(data: Registration) {
    this.isLoading = true
    return api.post('/user/registration', data)
      .then(res => {
        this.user = jwtDecode(res.data.token)
        localStorage.setItem('user', res.data.token)
      })
      .catch(error => {
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)
  }

  IsRegistration(data: Registration) {
    return api.post('/user/isRegistration', data)
      .then(res => {
        return res.data
      })
      .catch(error => {
        return error.data
      })
  }

  login(data: Auth) {
    this.logout()
    this.isLoading = true
    console.log(toJS(data))
    return api.post('/user/login', data)
      .then(res => {
        const userLogin = jwtDecode<{ login: string }>(res.data.token).login
        localStorage.setItem('user', res.data.token)
        return api.get(`/user/getOne/${userLogin}`)
          .then(res => {
            this.user = res.data
          })
          .catch(error => {
            return error.data
          })
      })
      .catch(error => {
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)
  }

  logout() {
    localStorage.removeItem('user')
    this.user = null
  }

  github() {
    this.isLoading = true

    return api.get('https://github.com/login/oauth/authorize' +
      '?client_id=fccb4e3b244d078ba4fb' +
      '&redirect_uri=http://localhost:3000' +
      '?path=/' +
      '&scope=user:email\'', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }
    })
      .then()
      .catch(error => {
        console.dir(error)
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)

    // return api.post-page('https://github.com/login/oauth/access_token?' +
    //   'client_id=fccb4e3b244d078ba4fb' +
    //   '&client_secret=2ade5a20e5af4447f573a9eaf9cd707332ec4a7d' +
    //   '&redirect_uri=http://localhost:3000' +
    //   '&code=')
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(error => {
    //     console.dir(error)
    //     this.error = error.message
    //     throw new Error()
    //   })
    //   .finally(() => this.isLoading = false)
  }

  checkAuth() {
    if (localStorage.getItem('user')) {
      const token: string | null = localStorage.getItem('user')
      if (token !== null) {
        const userLogin = jwtDecode<{ login: string }>(token).login
        return api.get(`/user/getOne/${userLogin}`)
          .then(res => {
            this.user = res.data
          })
          .catch(error => {
            return error.data
          })
      }
    }
    return Promise.resolve()
  }

  async getInterlocutor(dialog: Dialog) {
    return await api.get(`/dialogues/getUserDialog/${dialog._id}`)
      .then(res => res.data)
  }

  getUserNameSurname(user: User) {
    return `${user.name} ${user.surname}`
  }

}

export const authStore = new AuthStore()