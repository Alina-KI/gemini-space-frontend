import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { api } from '../api'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    api.get<User[]>('/users')
      .then(res => setUsers(res.data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [])

  return {
    users,
    isLoading,
    error
  }
}
