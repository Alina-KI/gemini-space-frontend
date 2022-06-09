import { makeAutoObservable } from 'mobx'
import { User } from '../types/user'
import { api } from '../api'
import { getFileUrl } from '../functions/get-file-url'

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
    this.user!.avatar = getFileUrl(avatarPath)
  }
}

export const userPageStore = new UserPageStore()