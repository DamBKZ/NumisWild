import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CoinForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CoinFormData>();

  const onSubmit = async (data: CoinFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/money`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          value: Number.parseFloat(data.value.toString()),
          year: Number.parseInt(data.year.toString()),
          diameter: data.diameter
            ? Number.parseFloat(data.diameter.toString())
            : null,
          weight: data.weight
            ? Number.parseFloat(data.weight.toString())
            : null,
        }),
      });

      if (!response.ok) throw new Error();
      toast.success("Elément ajouté avec succès");
      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <section className="rounded-md bg-red-50 p-4">
          <section className="text-sm text-red-700">{error}</section>
        </section>
      )}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <section>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            {...register("name", { required: "Nom requis" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </section>

        <section>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Pays
          </label>
          <input
            {...register("country", { required: "Pays requis" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </section>

        <section>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Année
          </label>
          <input
            type="number"
            {...register("year", {
              required: "Année requise",
              min: { value: 1, message: "Année invalide" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.year && (
            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
          )}
        </section>

        <section>
          <label
            htmlFor="value"
            className="block text-sm font-medium text-gray-700"
          >
            Valeur
          </label>
          <input
            type="number"
            step="0.01"
            {...register("value", {
              required: "Valeur requise",
              min: { value: 0, message: "La valeur doit être positive" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
          )}
        </section>

        <section>
          <label
            htmlFor="material"
            className="block text-sm font-medium text-gray-700"
          >
            Matériau
          </label>
          <input
            {...register("material")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </section>

        <section>
          <label
            htmlFor="condition"
            className="block text-sm font-medium text-gray-700"
          >
            État
          </label>
          <select
            {...register("condition", { required: "État requis" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Sélectionner un état</option>
            <option value="Neuf">Neuf</option>
            <option value="Excellent">Excellent</option>
            <option value="Très bon">Très bon</option>
            <option value="Bon">Bon</option>
            <option value="Moyen">Moyen</option>
            <option value="Mauvais">Mauvais</option>
          </select>
          {errors.condition && (
            <p className="mt-1 text-sm text-red-600">
              {errors.condition.message}
            </p>
          )}
        </section>

        <section>
          <label
            htmlFor="diameter"
            className="block text-sm font-medium text-gray-700"
          >
            Diamètre (mm)
          </label>
          <input
            type="number"
            step="0.1"
            {...register("diameter")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </section>

        <section>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Poids (g)
          </label>
          <input
            type="number"
            step="0.1"
            {...register("weight")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </section>

        <section className="sm:col-span-2">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700"
          >
            URL de l'image
          </label>
          <input
            type="url"
            {...register("image_url")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </section>

        <section className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </section>

        <section className="sm:col-span-2">
          <section className="flex items-center">
            <input
              type="checkbox"
              {...register("is_banknote")}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_banknote"
              className="ml-2 block text-sm text-gray-700"
            >
              C'est un billet
            </label>
          </section>
        </section>
      </section>

      <section className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Loader className="animate-spin h-5 w-5" /> : "Ajouter"}
        </button>
      </section>
    </form>
  );
}
