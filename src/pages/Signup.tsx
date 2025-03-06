import { Fragment } from "react/jsx-runtime"
import CardInscription from "../domains/auth/components/CardInscription"

const Signup = () => {
  return (
    <Fragment>
      <div className="w-full h-full flex bg-(--dm-surface-a0)">
        <CardInscription />
      </div>
    </Fragment>
  )
}

export default Signup