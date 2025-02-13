import { useEffect, useState } from "react";

interface EditCoinFormProps {
  coin: Coin | null;
  onSave: (updatedCoin: Coin) => void;
  onClose: () => void;
}

const EditCoinForm: React.FC<EditCoinFormProps> = ({
  coin,
  onSave,
  onClose,
}) => {
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
      <section className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-medium mb-4">Modifier la pièce</h2>
        <form onSubmit={handleSubmit}>
          <section className="mb-4">
            <label className="block">
              Label
              <input
                type="text"
                name="label"
                value={formData.label || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Pays
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Année
              <input
                type="number"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Valeur (€)
              <input
                type="number"
                name="value"
                value={formData.value || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Matériau
              <input
                type="text"
                name="material"
                value={formData.material || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Diamètre (cm)
              <input
                type="number"
                step="0.01"
                name="diameter"
                value={formData.diameter || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Poids (g)
              <input
                type="number"
                step="0.01"
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              État
              <input
                type="text"
                name="money_condition"
                value={formData.money_condition || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </section>

          <section className="mb-4">
            <label className="block">
              Description
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </section>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded mt-4"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded mt-4 ml-2"
          >
            Fermer
          </button>
        </form>
      </section>
    </section>
  );
};

export default EditCoinForm;
