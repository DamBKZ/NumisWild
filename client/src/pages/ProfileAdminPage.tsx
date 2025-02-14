import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/NavBar";

export default function ProfileAdminPage() {
  const data = useLoaderData() as AdminType;
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleback = () => {
    navigate("/homepage");
  };

  useEffect(() => {
    if (!data.isAdmin) {
      navigate("/homepage");
    }
  }, [data.isAdmin, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des utilisateurs");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Impossible de récupérer les utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (!response.ok) throw new Error("Erreur lors de la suppression");

        setUsers(users.filter((user) => user.id !== userId));
        toast.success("Utilisateur supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Administration des utilisateurs
        </h1>

        {loading && <p>Chargement des utilisateurs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Liste des utilisateurs
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-500">Aucun utilisateur trouvé</p>
          ) : (
            users.map((user) => (
              <section
                key={user.id}
                className="bg-gray-50 p-4 mb-4 shadow-md rounded-lg flex justify-between items-center"
              >
                <section>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    Inscrit le{" "}
                    {new Date(user.created_at).toLocaleDateString("fr-CA")}
                  </p>
                </section>

                <section className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </section>
              </section>
            ))
          )}
        </section>
        <footer className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleback}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 rounded-md"
          >
            Retour à l'accueil
          </button>
        </footer>
      </main>
    </section>
  );
}
