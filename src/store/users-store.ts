import { makeAutoObservable, when } from 'mobx'
import { User } from '../types/user'
import { api } from '../api'
import { authStore } from './auth-store'

export type StoreUser = User & {}

class UsersStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  users: User[] = []
  isLoading = false

  async fetchMyFriends() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    api.get<User[]>(`/user/${authStore.user?.login}/friends`)
      .then(res => this.users = res.data)
      .finally(() => this.isLoading = false)
  }

  async fetchNotMyFriends() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    return api.get<User[]>(`/user/${authStore.user?.login}/not-friends`)
      .then(res => this.users = res.data)
      .finally(() => this.isLoading = false)
  }

  addToFriends({ login }: User) {
    return api.post(`/user/${login}/add-to-friends`)
  }

  removeFromFriends({ login }: User) {
    return api.delete(`/user/${login}/remove-from-friends`)
  }
}

export const userStore = new UsersStore()