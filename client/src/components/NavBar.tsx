import { Coins, LogOut, Shield, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/role`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok)
          throw new Error("Erreur lors de la récupération du rôle");

        const data = await response.json();

        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du rôle utilisateur:",
          error,
        );
      }
    };

    fetchUserRole();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex justify-between h-16 items-center">
          <section className="flex items-center space-x-8">
            <img
              src="/Logo.webp"
              alt="NumisCollect Logo"
              className="h-10 w-10 rounded-full mr-4"
            />
            <span className="text-xl font-semibold text-white">NumisWild</span>
          </section>
          <section className="flex items-center space-x-6">
            <Link
              to="/homepage"
              className="flex items-center text-white hover:text-gray-200"
            >
              <Coins className="h-5 w-5 mr-2" />
              <span>Ma Collection</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center text-white hover:text-gray-200"
            >
              <UserCircle className="h-5 w-5 mr-1" />
              <span>Profil</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center text-white hover:text-gray-200"
              >
                <Shield className="h-5 w-5 mr-1" />
                <span>Admin</span>
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center text-white hover:text-gray-200"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Déconnexion</span>
            </button>
          </section>
        </section>
      </section>
    </nav>
  );
}
