import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./NavBar";

export default function UserProfile({ id }: { id: string }) {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/homepage");
  };

  const [user, setUser] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdateFormValues>();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des données");

        const data = await response.json();
        setUser(data);
        reset(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des informations");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, reset]);

  const onSubmit = async (data: UpdateFormValues) => {
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            lastname: data.lastname?.toLowerCase(),
            firstname: data.firstname?.toLowerCase(),
            email: data.email?.toLowerCase(),
            new_password: data.new_password,
          }),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      toast.success("Modifications prises en compte");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      </div>
    );
  }

  if (!user) return <div>Chargement...</div>;

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <section className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Mes informations
        </h2>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              type="text"
              defaultValue={user.firstname}
              {...register("firstname")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              defaultValue={user.lastname}
              {...register("lastname")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-gray-700"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              {...register("new_password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {updating ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
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
  );
}
