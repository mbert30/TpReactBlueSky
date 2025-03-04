import { Fragment } from "react/jsx-runtime"
import ButtonPrincipal from "../../../ui/ButtonPrincipal"
import { useEffect, useState } from "react"
import { fetchUser } from "../authSlice"
import { verifInfoConnexion } from "../service"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { useNavigate } from "react-router"

const CardConnexion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const infoConn = useAppSelector((state: { auth: {token: string, isLogged: boolean}}) => state.auth)

  const formSubmitLogin = async (e: any) => {
    e.preventDefault()
    if(verifInfoConnexion(email, password)) {
      dispatch(fetchUser({email, password}))
    }
  }
  useEffect(() => {
    if(infoConn.isLogged) {
      navigate('/')
    }
  }, [infoConn])

  return (
    <Fragment>
      <form className="m-auto px-15 py-10 flex flex-col justify-center content-center text-(--clr-light-a0) border border-(--dm-surface-a30) rounded-lg bg-(--dm-surface-a10)" onSubmit={formSubmitLogin}>
        <h1 className="text-2xl mb-5">Connexion</h1>

        <label className="mb-2">Identifiant</label>
        <input className="mb-3 bg-(--dm-surface-a10) border border-(--dm-surface-a30) text-(--clr-light-a0)" type='text' value={email} onChange={(valeur: any) => setEmail(valeur.target.value)} />

        <label className="mb-2">Mot de passe</label>
        <input className="mb-5 bg-(--dm-surface-a10) border border-(--dm-surface-a30) text-inherit" type='password' value={password} onChange={(valeur: any) => setPassword(valeur.target.value)} />

        <ButtonPrincipal valueButton='Valider' />
      </form>
    </Fragment>
  )
}

export default CardConnexion