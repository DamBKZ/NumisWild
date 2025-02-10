import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <h1>Error404</h1>
      <div>
        <img src="/404.gif" alt="GIF mauvaise route" />
      </div>
      <p>La page que vous recherchez n'existe pas ou est indisponible.</p>
      <div>
        <button type="button">
          <a href="mailto:crewcodile@gmail.com?subject=Sujet%20du%20mail&body=Contenu%20du%20message">
            Contactez-nous
          </a>
        </button>
        <button type="button">
          <NavLink to={"/"}>Page d'accueil</NavLink>
        </button>
      </div>
    </>
  );
}

export default ErrorPage;
