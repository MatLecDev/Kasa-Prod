import LoginForm from "@/app/login/_components/form";
import "@/styles/logForm.scss"
import Link from "next/link";
import WebPageSchema from "@/app/schemas/WebPageSchema";

/**
 * Page de connexion de l'application Kasa.
 *
 * Affiche le formulaire de connexion, un lien vers la page d'inscription
 * et un schéma JSON-LD pour le référencement SEO.
 *
 * @returns {JSX.Element} La page de connexion.
 */

export default function Login(){
    return(
        <main className="logPage">
            <section className="formWrapper">
                <h1>Heureux de vous revoir</h1>
                <p>Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>
                <LoginForm />
                <div className="formLinks">
                    <p>Mot de passe oublié</p>
                    <p>Pas encore de compte ?
                        <Link href="/register" style={{fontWeight: 500}}> Inscrivez-vous</Link>
                    </p>
                </div>
            </section>
            <WebPageSchema page="login" />
        </main>
    )
}