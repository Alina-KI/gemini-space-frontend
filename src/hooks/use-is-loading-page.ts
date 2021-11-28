import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export  const useIsLoadingPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    setIsLoadingPage(pathname !== '/auth' && pathname !== '/registration')
  }, [location])

  return isLoadingPage
}