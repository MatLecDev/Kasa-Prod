import Image from "next/image";
import "@/styles/about.scss"
import AboutSchema from "@/app/schemas/AboutSchema";

export default function APropos(){
    return (
        <main className="aboutPage">
            <section className="aboutHeader">
                <h1>À propos</h1>
                <p>Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.<br /><br />
                    Depuis notre création, nous mettons en relation des voyageurs en quête d'authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.</p>
                <Image
                    src="/backgrounds/about-background1.png"
                    alt="about background 1"
                    width={1920}
                    height={1080}
                    priority
                    sizes="100vw"
                    quality={60}
                />
            </section>
            <section className="aboutDetails">
                <h2>Notre mission est simple :</h2>
                <ol>
                    <li>Offrir une plateforme fiable et simple d'utilisation</li>
                    <li>Proposer des hébergements variés et de qualité</li>
                    <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
                </ol>
                <Image
                    src="/backgrounds/about-background2.png"
                    alt="about background 2"
                    width={1920}
                    height={1080}
                    sizes="100vw"
                    quality={60}
                />
                <p>Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne,
                    Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.</p>
            </section>
            <AboutSchema />
        </main>
    )
}