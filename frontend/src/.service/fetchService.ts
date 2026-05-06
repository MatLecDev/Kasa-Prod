import { cookies } from "next/headers";
import {ApiError} from "@/types";

const BASE_URL = process.env.BASE_URL;

/**
 * Service générique pour effectuer des appels à l'API backend.
 *
 * Gère automatiquement :
 * - L'ajout du token d'authentification dans les headers si requis
 * - La sérialisation du body en JSON ou l'envoi en FormData
 * - La gestion des erreurs HTTP
 *
 * @param {boolean} requireAuth - Indique si la requête nécessite un token d'authentification.
 * @param {string} endpoint - Le chemin de l'endpoint à appeler (ex: "/api/properties").
 * @param {string} method - La méthode HTTP à utiliser (GET, POST, PUT, DELETE, etc.).
 * @param {object} [body] - Le corps de la requête (optionnel). Peut être un objet plain ou une instance de FormData.
 * @returns {Promise<any>} Les données JSON retournées par l'API, ou null si la réponse est vide.
 * @throws {Error} Lance une erreur avec le message retourné par l'API si la requête échoue (response.ok === false).
 *
 * @example
 * // Appel authentifié avec un body JSON
 * const data = await fetchService(true, "/api/properties", "POST", { title: "Mon bien" });
 *
 * @example
 * // Appel public sans body
 * const properties = await fetchService(false, "/api/properties", "GET");
 */

export async function fetchService(requireAuth: boolean, endpoint: string, method: string, body?: object) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const isGet = method === "GET";
    const isFormData = body instanceof FormData;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(requireAuth ? { Authorization: `Bearer ${token}` } : {})
        },
        ...(!isGet && body ? { body: isFormData ? body : JSON.stringify(body) } : {})
    });

    if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error);
    }

    const data = await response.json();
    return data ?? null;
}