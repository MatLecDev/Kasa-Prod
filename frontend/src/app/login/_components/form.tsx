'use client'

import {useState} from "react";
import {login} from "@/.service/authService";
import {redirect} from "next/navigation";
import sanitize from "@/lib/sanitize";

/**
 * Formulaire de connexion utilisateur.
 *
 * Gère la saisie de l'email et du mot de passe, valide le format de l'email
 * côté client avant l'envoi, puis appelle le service d'authentification.
 * En cas de succès, l'utilisateur est redirigé vers l'accueil.
 * En cas d'échec, un message d'erreur est affiché sous le formulaire.
 *
 * @returns {JSX.Element} Le formulaire de connexion.
 */

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");

    /**
     * Gère la soumission du formulaire de connexion.
     *
     * Valide le format de l'email via une expression régulière, puis appelle
     * le service de connexion. Redirige vers "/" en cas de succès.
     * Filtre l'erreur interne "NEXT_REDIRECT" de Next.js pour ne pas l'afficher à l'utilisateur.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
     * @returns {Promise<void>}
     */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

        if (!emailRegex.test(email)) {
           setError("L'email doit être au format 'nom@domaine.com'.");
           return;
        }

        try {
            await login(email, password);
            redirect("/");
        }
        catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                setError("Identifiants incorrects.");
            } else {
                throw error;
            }
        }
    }
    return (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Adresse email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(sanitize(e.target.value))} />
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                name="email"
                value={password}
                onChange={(e) => setPassword(sanitize(e.target.value))} />
            <p className="error">{error}</p>
            <button type="submit">Se connecter</button>
        </form>
    )
}