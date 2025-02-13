import { Edit, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function CoinList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCoins = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/money`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok)
        throw new Error("Erreur lors de la récupération des pièces");

      const data: Coin[] = await response.json();
      setCoins(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCoin = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette pièce ?"))
      return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/money/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setCoins(coins.filter((coin) => coin.id !== id));
      toast.success("Pièce supprimée avec succès !");
    } catch (err) {
      toast.error("Une erreur est survenue lors de la suppression");
    }
  };

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) => {
      const label = coin.label?.toLowerCase() || "";
      const country = coin.country?.toLowerCase() || "";
      return (
        label.includes(searchQuery.toLowerCase()) ||
        country.includes(searchQuery.toLowerCase())
      );
    });
  }, [coins, searchQuery]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Mise à jour de l'état
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Rechercher une pièce ou un billet..."
        />
      </div>

      {/* Liste des pièces */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <img
              className="h-24 w-24 object-cover"
              src={`/${coin.picture}`}
              alt={coin.label}
            />

            <div className="px-4 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {coin.label}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {coin.country}, {coin.year}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-600">
                  Valeur: {coin.value}€
                </span>
                <span className="text-sm text-gray-500">
                  État: {coin.money_condition}
                </span>
              </div>
              {coin.description && (
                <p className="mt-2 text-sm text-gray-500">{coin.description}</p>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    /* TODO: Implémenter l'édition */
                  }}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteCoin(coin.id)}
                  className="p-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
