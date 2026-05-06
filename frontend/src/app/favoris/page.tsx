import {getFavorites} from "@/.service/favoriteService";
import {Properties} from "@/types";
import {getSessionUserId} from "@/.service/sessionService";
import PropertyCard from "@/ui/PropertyCard";
import "@/styles/favorite.scss"
import Link from "next/link";

/**
 * Page affichant les propriétés mises en favoris par l'utilisateur connecté.
 *
 * Récupère l'identifiant de l'utilisateur depuis la session, puis charge ses favoris
 * via l'API. Les propriétés sont triées alphabétiquement par titre avant affichage.
 *
 * Si l'utilisateur n'est pas connecté ou n'a aucun favori, un message et un lien
 * vers la page d'accueil sont affichés à la place.
 *
 * @returns {Promise<JSX.Element>} La page des favoris de l'utilisateur.
 */

export default async function Favoris(){
    const userId = await getSessionUserId();
    const favorites: Properties = userId ? await getFavorites(userId) : [];

    /**
     * Liste des favoris triée alphabétiquement par titre.
     * @type {Properties}
     */

    const sortedFavorites = favorites.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    return (
        <main>
            <section className="favoriteHeader">
                <h1>Vos favoris</h1>
                <p>Retrouvez ici tous les logements que vous avez aimés.<br />
                    Prêts à réserver ? Un simple clic et votre prochain séjour est en route.</p>
            </section>
            {favorites.length > 0 && (
                <section className="properties">
                    {sortedFavorites.map((fav) => {
                        return (
                            <PropertyCard key={fav.id} property={fav} isLiked={true}/>
                        )
                    })}
                </section>
            ) || (
                <section className="emptyProperties">
                    <p>Il semblerait que vous n&#39;ayez pas encore eu de coup de coeur...</p>
                    <Link href="/">
                        <button>Trouver un logement</button>
                    </Link>
                </section>
            )}
        </main>
    )
}