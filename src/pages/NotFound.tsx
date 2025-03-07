import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Fragment>
      <div className="m-auto h-full px-15 py-10 flex flex-col justify-center content-center text-(--clr-light-a0) border border-(--dm-surface-a30) bg-(--dm-surface-a10) text-center">
        <h1 className="text-4xl mb-5">404 - Page Introuvable</h1>
        <p className="mb-5">Désolé, la page que vous recherchez n'existe pas.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
