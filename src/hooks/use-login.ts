import { useEffect, useState } from 'react'
import { Login } from '../types/login'
import { api } from '../api'

export function useUsers() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
  }, [])

  return {
    isLoading,
    error
  }
}
