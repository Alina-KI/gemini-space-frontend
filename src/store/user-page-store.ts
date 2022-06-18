import { makeAutoObservable } from 'mobx'
import { User } from '../types/user'
import { api } from '../api'
import { authStore } from './auth-store'
import { CreatePost } from '../types/post'

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
  
  async uploadNewAvatar(image: File){
    const formData = new FormData()
    formData.append('avatar', image)
    const avatarPath = await api.post('files/upload/avatar', formData).then(res => res.data)
    this.user!.avatar = avatarPath
    authStore.user!.avatar = avatarPath
  }

  async createPost(data: CreatePost){
    return api.post('/post/user/create', { ...data, login: authStore.user!.login } )
      .then(res => this.user!.posts.push(res.data))
  }

  async changeLikes(id: string){
    return api.post('/post/changeLikes', { _id: id })
      .then( res => {
        return this.user!.posts.map(post => {
          if (post._id === id){
            post.likes = res.data
          }
        })
      })
  }
}

export const userPageStore = new UserPageStore()