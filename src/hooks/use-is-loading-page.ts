import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dialogsStore } from '../store/dialogs-store'

export  const useIsLoadingPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    setIsLoadingPage(pathname !== '/auth' && pathname !== '/registration')
  }, [location])

  return isLoadingPage
}

export  const useIsMessagePage = () => {
  const location = useLocation()
  const pathname = location.pathname

  return useMemo(() => {
    const id = dialogsStore.selectedDialog?._id
    return !!id && pathname.includes(`/dialogs/${id}`)
  }, [location.pathname, dialogsStore.selectedDialog?._id])
}