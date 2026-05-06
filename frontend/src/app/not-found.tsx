import Link from "next/link";
import "@/styles/not-found.scss"

export default function NotFound(){
    return (
        <main className="not-found">
            <h1>404</h1>
            <p>Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.</p>
            <Link href="/">
                <button>Accueil</button>
            </Link>
            <Link href="/ajouter-propriete">
                <button>Logement</button>
            </Link>
        </main>
    )
}