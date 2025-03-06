import { Fragment } from "react/jsx-runtime";
import ButtonPrincipal from "../../../ui/ButtonPrincipal";
import { useEffect, useState } from "react";
import { addUser } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { Link, useNavigate } from "react-router";
import { verifInfoInscription } from "../service";
import { toast } from "react-toastify";
import { messageErreur } from "../../../app/toastStyle";

const CardInscription = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const infoConn = useAppSelector((state: { auth: { token: string, isLogged: boolean } }) => state.auth);

  const formSubmitSignup = async (e: any) => {
    e.preventDefault();
    if(verifInfoInscription(email, password, username)) {
      dispatch(addUser({ email, password, username }))
    } else {
      toast.error('Erreur : Les informations sont incorrect', messageErreur);
    }
  };

  useEffect(() => {
    if (infoConn.isLogged) {
      navigate("/");
    }
  }, [infoConn]);

  return (
    <Fragment>
      <form
        className="m-auto px-15 py-10 flex flex-col justify-center content-center text-(--clr-light-a0) border border-(--dm-surface-a30) rounded-lg bg-(--dm-surface-a10)"
        onSubmit={formSubmitSignup}
      >
        <h1 className="text-2xl mb-5">Inscription</h1>

        <label className="mb-2">Nom d'utilisateur</label>
        <input
          className="mb-3 bg-(--dm-surface-a10) border border-(--dm-surface-a30) text-(--clr-light-a0)"
          type='text'
          value={username}
          onChange={(valeur: any) => setUsername(valeur.target.value)}
        />

        <label className="mb-2">Email</label>
        <input
          className="mb-3 bg-(--dm-surface-a10) border border-(--dm-surface-a30) text-(--clr-light-a0)"
          type='text'
          value={email}
          onChange={(valeur: any) => setEmail(valeur.target.value)}
        />

        <label className="mb-2">Mot de passe</label>
        <input
          className="mb-5 bg-(--dm-surface-a10) border border-(--dm-surface-a30) text-inherit"
          type='password'
          value={password}
          onChange={(valeur: any) => setPassword(valeur.target.value)}
        />

        <ButtonPrincipal valueButton="S'inscrire" />
        <p> Déjà un compte ? <Link to="/login"><span className="text-(--clr-link-a0)">Connectez-vous ici</span></Link></p>
      </form>
    </Fragment>
  );
};

export default CardInscription;
