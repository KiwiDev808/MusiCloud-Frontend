import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { validToken } from '../utils/validToken'

function useProtectedPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  useEffect(() => {
    const storedToken: string | null = localStorage.getItem('token')
    validToken(storedToken).then((isValidToken) => {
      if (isValidToken) {
        setToken(storedToken as string)
      } else {
        router.push('/')
      }
    })
  }, [])

  return token
}

export default useProtectedPage
