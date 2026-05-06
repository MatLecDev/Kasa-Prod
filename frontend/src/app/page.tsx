import Image from "next/image";
import "@/styles/home.scss"
import {getProperties} from "@/.service/propertiesService";
import {Properties} from "@/types";
import PropertyCard from "@/ui/PropertyCard";
import {getFavorites} from "@/.service/favoriteService";
import {getSessionUserId} from "@/.service/sessionService";
import HomeSchema from "@/app/schemas/HomeSchema";

export default async function Home() {
    const properties: Properties = await getProperties();
    const userId = await getSessionUserId();
    const favorites: Properties = userId ? await getFavorites(userId) : [];

    return (
        <main className="home">
            <section className="home-header-section">
                <h1>Chez vous, partout et ailleurs</h1>
                <p>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes</p>
                <Image
                    src="/backgrounds/home-background.png"
                    alt="main background"
                    width={1920}
                    height={1080}
                    className="home-image"
                    priority
                    sizes="(max-width: 768px) 50vw, 50vw"
                    quality={60}
                />
            </section>
            <section className="properties">
                {properties && (properties.map((prop, key) => (
                    <PropertyCard
                        key={prop.id}
                        property={prop}
                        isLiked={favorites.some((fav) => fav.id === prop.id)}
                    />
                )) ||
                    (<p>Loading...</p>)
                )}
            </section>
            <section className="how-it-works">
                <h2>Comment ça marche ?</h2>
                <p>Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel,<br />
                    Kasa vous aide à trouver un lieu qui vous ressemble.</p>
                <div className="cards">
                    <article className="card">
                        <h3>Recherchez</h3>
                        <p>Entrez votre destination, vos dates et laissez Kasa faire le reste</p>
                    </article>
                    <article className="card">
                        <h3>Réservez</h3>
                        <p>Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.</p>
                    </article>
                    <article className="card">
                        <h3>Vivez l&#39;expérience</h3>
                        <p>Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.</p>
                    </article>
                </div>
            </section>
            <HomeSchema properties={properties} />
        </main>
    );
}
