import { useEffect, useState } from "react";

const EditCoinForm = ({ coin, onSave, onClose }: EditCoinFormProps) => {
  const [formData, setFormData] = useState<Coin | null>(coin);

  useEffect(() => {
    setFormData(coin);
  }, [coin]);

  if (!formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <section className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <section className="bg-white p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-medium mb-4">Modifier la pièce</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Label and input fields */}
          <section>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </section>

          <section>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Pays
            </label>
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
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
              name="year"
              value={formData.year || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </section>

          <section>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700"
            >
              Valeur (€)
            </label>
            <input
              type="number"
              name="value"
              value={formData.value || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </section>

          <section>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Matériau
            </label>
            <input
              type="text"
              name="material"
              value={formData.material || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </section>

          <section>
            <label
              htmlFor="diameter"
              className="block text-sm font-medium text-gray-700"
            >
              Diamètre (cm)
            </label>
            <input
              type="number"
              step="0.01"
              name="diameter"
              value={formData.diameter || ""}
              onChange={handleChange}
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
              step="0.01"
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </section>

          <section>
            <label
              htmlFor="money_condition"
              className="block text-sm font-medium text-gray-700"
            >
              État
            </label>
            <input
              type="text"
              name="money_condition"
              value={formData.money_condition || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </section>

          <section>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </section>

          {/* Action buttons */}
          <section className="flex justify-end space-x-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Fermer
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default EditCoinForm;
