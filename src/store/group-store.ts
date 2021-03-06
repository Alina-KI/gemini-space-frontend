import { makeAutoObservable, toJS, when } from 'mobx'
import { api } from '../api'
import { authStore } from './auth-store'
import { Group } from '../types/group'
import { userFilesStore } from './user-files-store'
import { postStore } from './post-store'

class GroupStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  groups: Group[] = []
  isLoading = false


  async fetchMyGroups() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    api.get<Group[]>('/community/getCommunities')
      .then(async res => {
        this.groups = res.data
        postStore.posts = (await Promise.all(this.groups.map(group => postStore.fetchPostsGroups(group._id)))).flat()
      })
      .finally(() => this.isLoading = false)
  }

  async fetchNotMyGroups() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    return api.get<Group[]>('/community/getNotCommunities')
      .then(res => this.groups = res.data)
      .finally(() => this.isLoading = false)
  }

  async createCommunity(title: string, description: string, image: File) {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    const photo = await userFilesStore.uploadPhotoFiles(image)
    return api.post('/community/create', { title, description, photo })
      .then(res => this.groups.push(res.data))
      .finally(() => this.isLoading = false)
  }

  async addedMember(id: string) {
    await when(() => !!authStore.user?.login)
    return api.post('/community/addedMember', { _id: id })
  }
}

export const groupStore = new GroupStore()