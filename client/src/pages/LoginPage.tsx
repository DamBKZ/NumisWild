import { Coins, Loader, Lock, Mail } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();

  const navigate = useNavigate();
  const onSubmitLogin = async (data: FieldValues) => {
    try {
      const { email, hash_password } = data;

      const loginData = {
        email: email.toLowerCase(),
        hash_password,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      if (response.ok) {
        reset();
        toast.success(result.message || "Connexion réussie !");
      } else {
        toast.error(result.message || "Erreur lors de la connexion");
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <section className="sm:mx-auto sm:w-full sm:max-w-md">
        <section className="flex justify-center">
          <Coins className="h-12 w-12 text-indigo-600" />
        </section>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connectez-vous à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            créez un nouveau compte
          </Link>
        </p>
      </section>

      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <section className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmitLogin)}>
            <section>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  id="email"
                  type="email"
                  aria-label="Saisissez votre email"
                  autoComplete="email"
                  {...register("email", {
                    required: "champ obligatoire",
                  })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="arthur@kaamelott.fr"
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.email?.message?.toString()}
              </p>
            </section>

            <section>
              <label
                htmlFor="hash_password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  id="hash_password"
                  type="password"
                  aria-label="Saisissez votre mot de passe"
                  placeholder="Saisissez votre mot de passe"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="current-password"
                  {...register("hash_password", {
                    required: "Le mot de passe est requis",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                      message:
                        "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                    },
                  })}
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.hash_password?.message?.toString()}
              </p>
            </section>

            <section>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  "Se connecter"
                )}
              </button>
            </section>
          </form>
        </section>
      </section>
    </section>
  );
}
