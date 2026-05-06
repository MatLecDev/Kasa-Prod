"use server"

import {fetchService} from "@/.service/fetchService";

const BASE_URL = process.env.BASE_URL;

/**
 * Envoie un fichier image vers le serveur et retourne son URL publique complète.
 *
 * Le fichier est transmis en multipart/form-data via FormData.
 * L'URL retournée est construite en préfixant l'URL relative reçue par l'API avec la BASE_URL.
 *
 * @param {File} file - Le fichier image à uploader (ex: sélectionné via un input de type "file").
 * @returns {Promise<string>} L'URL publique complète de l'image uploadée.
 * @throws {Error} Lance une erreur si l'upload échoue ou si l'utilisateur n'est pas authentifié.
 *
 * @example
 * const imageUrl = await uploadFile(file);
 * // "https://api.kasa.fr/uploads/image-abc123.jpg"
 */

export async function uploadFile(file: File){
    const body = new FormData();
    body.append("file", file);

    const response = await fetchService(true, "/api/uploads/image", "POST", body);

    console.log(response);

    return `${BASE_URL}${response.url}`;
}