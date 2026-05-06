'use client'
import {useState} from "react";
import {register} from "@/.service/authService"
import {redirect} from "next/navigation";
import sanitize from "@/lib/sanitize";

/**
 * Formulaire d'inscription d'un nouvel utilisateur.
 *
 * Collecte le prénom, le nom, l'email, le mot de passe et l'acceptation
 * des conditions générales. Effectue une validation complète côté client
 * avant d'appeler le service d'inscription. Le nom complet est construit
 * en concaténant le prénom et le nom avant l'envoi.
 * En cas de succès, l'utilisateur est redirigé vers l'accueil.
 *
 * @returns {JSX.Element} Le formulaire d'inscription.
 */

export default function RegisterForm() {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCGIChecked, setIsCGIChecked] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    /**
     * Gère la soumission du formulaire d'inscription.
     *
     * Valide l'ensemble des champs et accumule les erreurs dans un tableau
     * avant tout appel API. Si des erreurs sont présentes, elles sont affichées
     * et la soumission est interrompue. Sinon, appelle le service d'inscription
     * et redirige vers "/" en cas de succès.
     * Filtre l'erreur interne "NEXT_REDIRECT" de Next.js pour ne pas l'afficher à l'utilisateur.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
     * @returns {Promise<void>}
     */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: string[] = [];  // ← tableau local
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

        if (prenom === "") {
            newErrors.push("Un prénom doit être renseigné.");
        }
        if (nom === "") {
            newErrors.push("Un nom doit être renseigné.");
        }
        if (!emailRegex.test(email)) {
            newErrors.push("L'email doit être au format 'nom@domaine.com'.");
        }
        if (password.length < 5) {
            newErrors.push("Le mot de passe doit contenir au moins 6 caractères.");
        }
        if (!isCGIChecked) {
            newErrors.push("Vous devez accepter les conditions générales d'utilisation");
        }
        setErrors(newErrors);

        if (newErrors.length > 0) return;

        try {
            const fullName = prenom + " " + nom;
            await register(fullName, email, password);
            redirect("/");
        }
        catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                setErrors(["Une erreur est survenue lors de l'inscription."]);
            } else {
                throw error;
            }
        }
    }

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="prenom">Prénom</label>
            <input
                type="text"
                id="prenom"
                name="prenom"
                value={prenom}
                onChange={(e) => setPrenom(sanitize(e.target.value))} />
            <label htmlFor="nom">Nom</label>
            <input
                type="text"
                id="nom"
                name="nom"
                value={nom}
                onChange={(e) => setNom(sanitize(e.target.value))} />
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
                onChange={(e) => setPassword(sanitize(e.target.value))}/>
            <div className="checkbox">
                <input type="checkbox" id="checkbox" name="checkbox" onChange={(e) => setIsCGIChecked(!isCGIChecked)} />
                <label htmlFor="checkbox">J’accepte les conditions générales d’utilisation</label>
            </div>
            {errors.map((error, index) => (
                <p key={index} className="error">{error}</p>
            ))}
            <button type="submit">Se connecter</button>
        </form>
    )
}