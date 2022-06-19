import { makeAutoObservable, when } from 'mobx'
import { Post } from '../types/post'
import { api } from '../api'
import { groupStore } from './group-store'
import { authStore } from './auth-store'
import { userFilesStore } from './user-files-store'

class PostStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  posts: Post[] = []
  selectedGroupId: string | null = null
  isLoading = false
  isCreator = false

  get group() {
    const foundedGroup = groupStore.groups.find(group => group._id === this.selectedGroupId)
    if (foundedGroup?.creator === authStore?.user?.login) {
      postStore.isCreator = true
    }
    postStore.fetchPostsCommunity().then()
    return foundedGroup
  }

  async fetchPostsCommunity() {
    this.isLoading = true
    this.posts = []
    return api.get<Post[]>(`/post/community/getPosts/${this.selectedGroupId}`)
      .then(res => {
        this.posts = res.data
      })
      .catch()
      .finally(() => this.isLoading = false)
  }

  async fetchPostsUser() {
    await when(() => !!authStore.user?.login)
    this.isLoading = true
    this.posts = []
    return api.get<Post[]>(`/post/user/getPosts/${authStore.user!.login}`)
      .then(res => this.posts = res.data)
      .catch()
      .finally(() => this.isLoading = false)
  }

  async fetchPostsGroups(id: string) {
    this.isLoading = true
    return api.get<Post[]>(`/post/community/getPosts/${id}`)
      .then(res => res.data)
      .catch()
      .finally(() => this.isLoading = false)
  }

  async createPostCommunity(text: string, title: string, datePublished: string, image: File) {
    const photo = await userFilesStore.uploadPhotoFiles(image)
    return api.post(`/post/community/create/${this.selectedGroupId}`, { title, text, datePublished, photo })
      .then(res => this.posts.push(res.data))
  }

  async createPostUser(text: string, title: string, datePublished: string, image: File){
    const photo = await userFilesStore.uploadPhotoFiles(image)
    return api.post('/post/user/create', { title, text, datePublished, photo, login: authStore.user!.login } )
      .then(res => this.posts.push(res.data))
  }

  async changeLikesPost(id: string) {
    return api.post('/post/changeLikes', { _id: id })
      .then(res => {
        return this.posts.map(post => {
          if (post._id === id) {
            post.likes = res.data
          }
        })
      })
  }
}
export const postStore = new PostStore()