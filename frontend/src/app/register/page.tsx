import RegisterForm from "@/app/register/_components/form";
import "@/styles/logForm.scss"
import Link from "next/link";
import WebPageSchema from "@/app/schemas/WebPageSchema";

/**
 * Page d'inscription de l'application Kasa.
 *
 * Affiche le formulaire de création de compte, un lien vers la page de connexion
 * pour les utilisateurs déjà membres, et un schéma JSON-LD pour le SEO.
 *
 * @returns {JSX.Element} La page d'inscription.
 */

export default function Register(){
    return(
        <main className="logPage">
            <section className="formWrapper">
                <h1>Rejoignez la communauté Kasa</h1>
                <p>Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.</p>
                <RegisterForm />
                <div className="formLinks">
                    <p>Déjà membre ?
                        <Link href="/login" style={{fontWeight: 500}}>Se connecter</Link>
                    </p>
                </div>
            </section>
            <WebPageSchema page="login" />
        </main>
    )
}