import { Fragment } from "react/jsx-runtime"
import CardConnexion from "../domains/auth/components/CardConnexion"

const Login = () => {
  return (
    <Fragment>
      <div className="w-full h-full flex bg-(--dm-surface-a0)">
        <CardConnexion />
      </div>
    </Fragment>
  )
}

export default Login