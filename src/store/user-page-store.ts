import { makeAutoObservable } from 'mobx'
import { User } from '../types/user'
import { api } from '../api'

class UserPageStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User | null = null
  isLoading = false
  error = ''

  fetchUser(login: string) {
    this.isLoading = true
    api.get<User>(`/user/getOne/${login}`)
      .then(res => this.user = res.data)
      .finally(() => this.isLoading = false)
  }

}

export const userPageStore = new UserPageStore()