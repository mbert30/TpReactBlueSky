import { useEffect } from 'react'
import { useNavigate } from "react-router";
import { useAppSelector } from './store';
import { UserInfo } from '../domains/auth/types';

const AuthGuard = (WrappedComponent : any) => {
  const Auth = (props : any) => {
    const navigate = useNavigate()
    const infoConn = useAppSelector((state: { auth: {token: string, isLogged: boolean, userInfo: UserInfo}}) => state.auth)

    useEffect(() => {
      if(!sessionStorage.getItem('isLogged')) {
        navigate('/login')
      } else {

      }
    }, [])
    if (infoConn.isLogged) {
      return <WrappedComponent {...props} />
    }
  }

  return (
    Auth
  )
}

export default AuthGuard