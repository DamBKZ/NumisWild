import { Plus } from "lucide-react";
import { useState } from "react";
import CoinForm from "../components/Coins/CoinForm";
import CoinList from "../components/Coins/CoinList";
import Navbar from "../components/NavBar";

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Ma Collection
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gérez votre collection de monnaies et billets
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter
              </button>
            </div>
          </div>

          <div className="mt-8">
            <CoinList />
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Ajouter une pièce/billet
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Fermer</span>×
                  </button>
                </div>
                <CoinForm onSuccess={() => setShowAddForm(false)} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
