import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { authStore } from './auth-store'

class UserFilesStore {
  constructor() {
    makeAutoObservable(this)
  }

  async uploadNewAudio(audio: File, title: string) {
    const formData = new FormData()
    formData.append('audio', audio)
    formData.append('title', title)
    // @ts-ignore
    await api.post('files/upload/audio', formData).then(res => authStore.user.audioFiles.push(res.data))
  }
}

export const userFilesStore = new UserFilesStore()