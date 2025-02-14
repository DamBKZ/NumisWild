import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <section className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Erreur 404
        </h1>
        <section className="mb-4">
          <img
            src="/404.gif"
            alt="GIF mauvaise route"
            className="mx-auto h-100 w-100 object-contain"
          />
        </section>
        <p className="text-lg text-gray-600 mb-6">
          La page que vous recherchez n'existe pas ou est indisponible.
        </p>
        <section className="space-y-4">
          <button type="button" className="w-full inline-block">
            <a
              href="mailto:crewcodile@gmail.com?subject=Sujet%20du%20mail&body=Contenu%20du%20message"
              className="w-full inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Contactez-nous
            </a>
          </button>
          <button type="button" className="w-full inline-block">
            <NavLink
              to={"/"}
              className="w-full inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Page d'accueil
            </NavLink>
          </button>
        </section>
      </section>
    </section>
  );
}

export default ErrorPage;
