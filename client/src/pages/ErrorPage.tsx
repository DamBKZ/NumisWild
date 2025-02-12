import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <section className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1>Error404</h1>
        <section>
          <img src="/404.gif" alt="GIF mauvaise route" />
        </section>
        <p>La page que vous recherchez n'existe pas ou est indisponible.</p>
        <section>
          <button type="button">
            <a href="mailto:crewcodile@gmail.com?subject=Sujet%20du%20mail&body=Contenu%20du%20message">
              Contactez-nous
            </a>
          </button>
          <button type="button">
            <NavLink to={"/"}>Page d'accueil</NavLink>
          </button>
        </section>
      </section>
    </section>
  );
}

export default ErrorPage;
