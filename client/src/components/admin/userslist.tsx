import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UsersList({ user, onDelete }: UserProps) {
  const { register, handleSubmit } = useForm();
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    onDelete(user.id);
    toast.success("Utilisateur supprimé avec succès");
  };

  const onSubmit = async (data: Partial<UserListType>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("Utilisateur mis à jour");
      setEditing(false);
    } catch (error) {
      toast.error("Échec de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 p-4 mb-4 shadow-md rounded-lg">
      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <input
            type="text"
            defaultValue={user.firstname}
            {...register("firstname")}
            className="block w-full p-2 border rounded-md"
          />
          <input
            type="text"
            defaultValue={user.lastname}
            {...register("lastname")}
            className="block w-full p-2 border rounded-md"
          />
          <input
            type="email"
            defaultValue={user.email}
            {...register("email")}
            className="block w-full p-2 border rounded-md"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400">
              Inscrit le {new Date(user.created_at).toLocaleDateString("fr-CA")}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
