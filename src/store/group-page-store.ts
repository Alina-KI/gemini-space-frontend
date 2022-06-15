import { makeAutoObservable } from 'mobx'
import { Post } from '../types/post'
import { api } from '../api'
import { groupStore } from './group-store'
import { authStore } from './auth-store'

class GroupPageStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  posts: Post[] = []
  selectedGroupId: string | null = null
  isLoading = false
  isCreator = false

  get group () {
    const foundedGroup = groupStore.groups.find(group => group._id === this.selectedGroupId)
    if (foundedGroup?.creator === authStore?.user?.login){
      groupPageStore.isCreator = true
    }
    groupPageStore.fetchPosts().then()
    return foundedGroup
  }

  async fetchPosts() {
    this.isLoading = true
    return api.post('/community/create', { _id: this.selectedGroupId })
      .then(res => this.posts = res.data)
      .finally(() => this.isLoading = false)
  }

  async createPost(){
    // return api.post('/')
  }

  async addedLikes(){

  }

}
export const groupPageStore = new GroupPageStore()