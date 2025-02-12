import { useEffect, useState } from "react";
import UsersList from "../components/admin/userslist";

export default function UsersListPage() {
  const [users, setUsers] = useState<UserListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
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
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
        method: "DELETE",
      });

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression");
    }
  };

  return (
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
            <UsersList key={user.id} user={user} onDelete={handleDelete} />
          ))
        )}
      </section>
    </main>
  );
}
