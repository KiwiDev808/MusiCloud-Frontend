import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { validToken } from '../utils/validToken'

function useUnprotectedPage() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    validToken(token).then((isValidToken) => {
      if (isValidToken) {
        router.replace('/music')
      }
    })
  }, [])
}

export default useUnprotectedPage
