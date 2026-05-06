import {Property} from "@/types";
import Image from "next/image";
import {formatPrice} from "@/lib/format-price";
import "@/styles/propertyCard.scss"
import Link from "next/link";
import FavoriteButton from "@/ui/FavoriteButton";

/**
 * Carte de présentation d'une propriété immobilière.
 *
 * Affiche l'image de couverture, le titre, la localisation et le prix par nuit.
 * Inclut un bouton favori et un lien vers la page de détail de la propriété.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Property} props.property - L'objet propriété à afficher.
 * @param {boolean} props.isLiked - Indique si la propriété est dans les favoris de l'utilisateur.
 * @returns {Promise<JSX.Element>} La carte de la propriété.
 *
 * @example
 * <PropertyCard property={property} isLiked={false} />
 */

export default async function PropertyCard({property, isLiked}: { property: Property, isLiked: boolean }) {
    return(
        <article className="property-card">
            <FavoriteButton propertyId={property.id} isLiked={isLiked} />
            <Link href={`/properties/${property.slug}-${property.id}`} className="property-card-link">
                <Image
                    src={property.cover}
                    alt={`Illustration de ${property.title}`}
                    width={1028}
                    height={1028}
                    className="property-card-image"
                    priority
                    sizes="(max-width: 768px) 50vw, 50vw"
                    quality={60}
                />
                <div className="property-details">
                    <span>
                        <h2>{property.title}</h2>
                        <h3>{property.location}</h3>
                    </span>
                    <p><span className="bold">{formatPrice(property.price_per_night)}</span> par nuit</p>
                </div>
            </Link>
        </article>
    )
}