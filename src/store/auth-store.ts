import { makeAutoObservable } from 'mobx'
import { Auth } from '../components/pages/auth/auth'
import { Registration } from '../components/pages/registration/registration'
import { api } from '../api'
import jwtDecode from 'jwt-decode'

export type UserLoginType = {
  name: string
  surname: string
  lastname: string
  dateOfBirth: string
  phone: number
  town: string
  login: string
  email: string
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
        console.log(this.user)
        localStorage.setItem('user', JSON.stringify(this.user))
      })
      .catch(error => {
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)
  }

  login(data: Auth) {
    this.isLoading = true
    return api.post('/user/login', data)
      .then(res => {
        this.user = jwtDecode(res.data.token)
        localStorage.setItem('user', JSON.stringify(this.user))
      })
      .catch(error => {
        // console.dir(data)
        this.error = error.message
        throw new Error()
      })
      .finally(() => this.isLoading = false)
  }

}
export const authStore = new AuthStore()