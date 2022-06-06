import { makeAutoObservable } from 'mobx'
import { User } from '../types/user'

class UsersTalkStore {
  constructor() {
    makeAutoObservable(this)
  }
  
  users: User[] = []
  
  addedUsers(user: User) {
    this.users.push(user)
  }
  
}

export const usersTalkStore = new UsersTalkStore()