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
    api.get<Group[]>(`/user/${authStore.user?.login}/friends`)
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }

  async fetchNotMyGroups() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    return api.get<Group[]>(`/user/${authStore.user?.login}/not-friends`)
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }

}

export const groupStore = new GroupStore()