import { useEffect, useState } from 'react'
import { useNavigate } from "react-router";

const AuthGuard = (WrappedComponent : any) => {
  const Auth = (props : any) => {
    const navigate = useNavigate()
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
      if(!localStorage.getItem('Token')) {
        navigate('/login')
      } else {
        setIsLogged(true)
      }
    }, [])
    return (isLogged) ? <WrappedComponent {...props} /> : null
  }

  return (
    Auth
  )
}

export default AuthGuard