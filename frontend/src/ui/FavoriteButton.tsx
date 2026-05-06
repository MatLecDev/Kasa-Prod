'use client'

import {JSX, useState} from "react";
import Image from "next/image";
import "@/styles/favoriteButton.scss"
import {addFavorite, deleteFavorite} from "@/.service/favoriteService";
import {redirect} from "next/navigation";
import {isAuth} from "@/.service/isAuth";

/**
 * Bouton interactif permettant d'ajouter ou retirer une propriété des favoris.
 *
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion.
 * L'état du like est géré localement et synchronisé avec l'API à chaque interaction.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.propertyId - L'identifiant unique de la propriété concernée.
 * @param {boolean} props.isLiked - L'état initial du favori (true si déjà en favori).
 * @returns {JSX.Element} Un bouton avec une icône cœur, colorée selon l'état du favori.
 *
 * @example
 * <FavoriteButton propertyId="abc-123" isLiked={false} />
 */

export default function FavoriteButton({propertyId, isLiked: initialIsLiked}: {propertyId: string, isLiked: boolean}): JSX.Element {
    const [isLiked, setIsLiked] = useState(initialIsLiked);

    /**
     * Gère le clic sur le bouton favori.
     *
     * Vérifie l'authentification, puis appelle le service approprié
     * (ajout ou suppression) selon l'état actuel du favori.
     *
     * @returns {Promise<void>}
     */

    const handleLike = async () => {
        if(!(await isAuth())){
            redirect("/login");
            return;
        }

        if (isLiked) {
            await deleteFavorite(propertyId);
        } else {
            await addFavorite(propertyId);
        }
        setIsLiked(!isLiked);
    }

    return (
        <button className={isLiked ? "favoriteBtn favorite" : "favoriteBtn"}
                onClick={() => handleLike()}
        >
            <Image
                src={isLiked ? "/icons/favorite-red.svg" : "/icons/favorite-gray.svg"}
                alt={"Like button de " + propertyId}
                width={10}
                height={10}
                priority
                sizes="(max-width: 768px) 50vw, 50vw"
                quality={60}
            />
        </button>
    )
}