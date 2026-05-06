"use server"

import {fetchService} from "@/.service/fetchService";

/**
 * Récupère la liste des propriétés mises en favoris par un utilisateur.
 *
 * @param {number} userId - L'identifiant unique de l'utilisateur.
 * @returns {Promise<any>} La liste des propriétés favorites de l'utilisateur.
 * @throws {Error} Lance une erreur si la requête échoue ou si l'utilisateur n'est pas authentifié.
 *
 * @example
 * const favorites = await getFavorites(42);
 */

export async function getFavorites(userId: number) {
    const response = await fetchService(true, `/api/users/${userId}/favorites`, "GET");
    return response;
}

/**
 * Ajoute une propriété aux favoris de l'utilisateur connecté.
 *
 * @param {string} propertyId - L'identifiant unique de la propriété à ajouter en favori.
 * @returns {Promise<any>} La réponse de l'API confirmant l'ajout.
 * @throws {Error} Lance une erreur si la requête échoue ou si l'utilisateur n'est pas authentifié.
 *
 * @example
 * await addFavorite("property-abc-123");
 */

export async function addFavorite(propertyId: string) {
    const response = await fetchService(true, `/api/properties/${propertyId}/favorite`, "POST");
    return response;
}

/**
 * Supprime une propriété des favoris de l'utilisateur connecté.
 *
 * @param {string} propertyId - L'identifiant unique de la propriété à retirer des favoris.
 * @returns {Promise<any>} La réponse de l'API confirmant la suppression.
 * @throws {Error} Lance une erreur si la requête échoue ou si l'utilisateur n'est pas authentifié.
 *
 * @example
 * await deleteFavorite("property-abc-123");
 */

export async function deleteFavorite(propertyId: string) {
    const response = await fetchService(true, `/api/properties/${propertyId}/favorite`, "DELETE");
    return response;
}