import { makeAutoObservable, when } from 'mobx'
import { api } from '../api'
import { authStore } from './auth-store'
import { Group } from '../types/group'

class GroupStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  groups: Group[] = []
  isLoading = false

  async fetchMyGroups() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    api.post<Group[]>('/community')
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }

  async fetchNotMyGroups() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    return api.get<Group[]>(`/user/${authStore.user?.login}/not-communities`)
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }

  async createCommunity() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    return api.post(`/user/${authStore.user?.login}/not-communities`)
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }
}

export const groupStore = new GroupStore()