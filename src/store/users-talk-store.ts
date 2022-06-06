import { makeAutoObservable } from 'mobx'
import { User } from '../types/user'

class UsersTalkStore {
  constructor() {
    makeAutoObservable(this)
  }
  
  users: User[] = []
  
  addedUsers(user: User) {
    const isAddedUser = this.users.find(u => u._id == user._id)
    if (!isAddedUser) {
      this.users.push(user)
    }
  }

  removeUsers(user: User) {
    this.users = this.users.filter(u => u._id !== user._id)
  }
}

export const usersTalkStore = new UsersTalkStore()