"use server"

import {fetchService} from "@/.service/fetchService";

/**
 * Récupère la liste de toutes les propriétés immobilières disponibles.
 *
 * @returns {Promise<any>} La liste des propriétés retournée par l'API.
 * @throws {Error} Lance une erreur si la requête échoue.
 *
 * @example
 * const properties = await getProperties();
 */

export async function getProperties(){
    return await fetchService(false,"/api/properties", "GET");

}

/**
 * Récupère le détail d'une propriété immobilière par son identifiant.
 *
 * @param {string} id - L'identifiant unique de la propriété.
 * @returns {Promise<any>} Les données de la propriété correspondante.
 * @throws {Error} Lance une erreur si la propriété n'existe pas ou si la requête échoue.
 *
 * @example
 * const property = await getProperty("property-abc-123");
 */

export async function getProperty(id: string){
    const body = {
        id: id,
    }
    return await fetchService(false,`/api/properties/${id}`, "GET", body);
}

/**
 * Crée une nouvelle propriété immobilière (nécessite d'être authentifié).
 *
 * @param {object} body - Les données de la propriété à créer (titre, description, prix, images, etc.).
 * @returns {Promise<any>} La propriété créée retournée par l'API.
 * @throws {Error} Lance une erreur si la requête échoue ou si l'utilisateur n'est pas authentifié.
 *
 * @example
 * const newProperty = await addProperty({
 *   title: "Appartement T3",
 *   price: 850,
 *   location: "Paris"
 * });
 */

export async function addProperty(body: object){
    return await fetchService(true,`/api/properties`, "POST", body);
}