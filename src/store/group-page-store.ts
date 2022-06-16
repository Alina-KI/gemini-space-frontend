import { makeAutoObservable } from 'mobx'
import { CreatePost, Post } from '../types/post'
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
    return api.get<Post[]>(`/post/getPosts/${this.selectedGroupId}`)
      .then(res => this.posts = res.data)
      .catch()
      .finally(() => this.isLoading = false)
  }

  async createPost(data: CreatePost){
    return api.post(`/post/create/${this.selectedGroupId}`, data )
      .then(res => this.posts.push(res.data))
  }

  async changeLikes(id: string){
    return api.post('/post/changeLikes', { _id: id })
      .then( res => {
        return this.posts.map(post => {
          if (post._id === id){
            post.likes = res.data
          }
        })
      })
  }

}
export const groupPageStore = new GroupPageStore()