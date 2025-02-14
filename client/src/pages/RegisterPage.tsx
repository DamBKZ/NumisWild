import { Coins, Loader, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const minPassword: number = 8;
  const maxPassword: number = 255;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { confirmed_password, ...rest } = data;

      const transformedData = {
        ...rest,
        lastname: rest.lastname.toLowerCase(),
        firstname: rest.firstname.toLowerCase(),
        email: rest.email.toLowerCase(),
        hash_password: rest.hash_password,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      await response.json();
      reset();
      toast.success("Demande envoyée à l'administrateur");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <section className="sm:mx-auto sm:w-full sm:max-w-md">
        <section className="flex justify-center">
          <Coins className="h-12 w-12 text-indigo-600" />
        </section>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            connectez-vous à votre compte
          </Link>
        </p>
      </section>

      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <section className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <section>
              <label className="flex flex-col gap-0.5" htmlFor="Firstname">
                Prénom
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  id="firstname"
                  type="text"
                  aria-label="Saisissez votre nom"
                  placeholder="Arthur"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("firstname", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s-]+$/,
                      message:
                        "Le prénom peut seulement contenir des lettres, des espaces et des tirets.",
                    },
                  })}
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.firstname?.message}
              </p>
            </section>

            <section>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="Lastname"
              >
                Nom
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  id="lastname"
                  type="text"
                  aria-label="Saisissez votre nom"
                  placeholder="Pendragon"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("lastname", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s-]+$/,
                      message:
                        "Le nom peut seulement contenir des lettres, des espaces et des tirets.",
                    },
                  })}
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.lastname?.message}
              </p>
            </section>

            <section>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
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
                  placeholder="arthur@kaamelott.fr"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="current-email"
                  {...register("email", {
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse email invalide",
                    },
                  })}
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.email?.message}
              </p>
            </section>

            <section>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="hash_password"
              >
                Mot de passe
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="hash_password"
                  type="password"
                  aria-label="Saisissez votre mot de passe"
                  placeholder="Saisissez votre mot de passe"
                  minLength={minPassword}
                  maxLength={maxPassword}
                  autoComplete="current-password"
                  {...register("hash_password", {
                    required: "champ obligatoire",
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
                {errors.hash_password?.message}
              </p>
            </section>
            <section>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirmer le mot de passe
              </label>
              <section className="mt-1 relative">
                <section className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </section>
                <input
                  id="confirmed_password"
                  type="password"
                  aria-label="Confirmez votre mot de passe"
                  placeholder="Confirmez votre mot de passe"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  minLength={minPassword}
                  maxLength={maxPassword}
                  autoComplete="confirmed_password"
                  {...register("confirmed_password", {
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                      message:
                        "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                    },
                    validate: (value) =>
                      value === watch("hash_password") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                />
              </section>
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmed_password?.message}
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
                  "Créer un compte"
                )}
              </button>
            </section>
          </form>
        </section>
      </section>
    </section>
  );
}
