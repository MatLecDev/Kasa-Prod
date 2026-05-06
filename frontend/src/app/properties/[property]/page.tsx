import {getProperty} from "@/.service/propertiesService";
import Image from "next/image";
import "@/styles/property.scss"
import Link from "next/link";
import Pictures from "@/app/properties/[property]/_components/pictures";
import PropertySchema from "@/app/schemas/PropertySchema";

/**
 * Page de détail d'une propriété immobilière.
 *
 * Extrait l'identifiant de la propriété depuis le slug de l'URL (format "titre-id"),
 * charge les données via l'API, puis affiche toutes les informations de la propriété :
 * galerie photos, description, équipements, catégories et informations sur l'hôte.
 *
 * Inclut également un schéma JSON-LD (PropertySchema) pour le référencement SEO.
 *
 * @param {Promise<{property: string}>} params - Les paramètres dynamiques de la route Next.js.
 *   Le paramètre `property` correspond au segment d'URL de format "slug-id" (ex: "appartement-cosy-42").
 * @returns {Promise<JSX.Element>} La page de détail de la propriété.
 *
 * @example
 * // URL : /properties/appartement-cosy-paris-42
 * // → extrait l'id "42" et charge la propriété correspondante
 */

export default async function Property({params}: {params: Promise<{property: string}>}){
    const { property } = await params;
    const slug = property.split("-");
    const id = slug[slug.length - 1];

    const propertyData = await getProperty(id);

    return (
        <main className="propertyPage">
            <Link href="/" className="goBackBtn">
                <button>
                    <Image
                        src="/icons/left-arrow.svg"
                        alt="Icone de flèche gauche"
                        width={10}
                        height={10}
                    />
                    Retour aux annonces
                </button>
            </Link>
            <section className="property">
                <Pictures propertyPictures={propertyData.pictures} />
                <article className="propertyDetails">
                    <div className="propertyMainInfos">
                        <h1>{propertyData.title}</h1>
                        <span>
                            <Image
                                src="/icons/localisation.svg"
                                alt="Icone de localisation"
                                width={20}
                                height={20}
                            />
                                {propertyData.location}
                        </span>
                        <p>{propertyData.description}</p>
                    </div>
                    <div className="propertyEquipements">
                        <h2>Equipement</h2>
                        <ul>
                            {propertyData.equipments.map((equipment: string[], index: number) => {
                                return (<li key={equipment + "-" + index}>{equipment}</li>)
                            })}
                        </ul>
                    </div>
                    <div className="propertyCategories">
                        <h2>Catégorie</h2>
                        <ul>
                            {propertyData.tags.map((tag: string[], index: number) => {
                                return (<li key={tag + "-" + index}>{tag}</li>)
                            })}
                        </ul>
                    </div>
                </article>
            </section>
            <section className="hostCard">
                <h2>Votre hôte</h2>
                <article className="hostCardHeader">
                    {propertyData.host.picture && (
                        <Image
                            src={propertyData.host.picture}
                            alt={"Photographie de " + propertyData.host.name}
                            width={64}
                            height={64}
                            priority
                        />
                    )}
                    <h3>{propertyData.host.name}</h3>
                    <span>
                        <Image
                            src="/icons/rating.svg"
                            alt="Icone de rating"
                            width={20}
                            height={20}
                        />
                        {propertyData.rating_avg}
                    </span>
                </article>
                <Link href="/messagerie">
                    <button>Contacter l&#39;hôte</button>
                </Link>
            </section>
            <PropertySchema property={propertyData} />
        </main>
    )
}