"use server"

import {fetchService} from "@/.service/fetchService";
import {cookies} from "next/headers";

/**
 * Inscrit un nouvel utilisateur et stocke son token et ses informations en cookie.
 *
 * @param {string} name - Le nom de l'utilisateur.
 * @param {string} email - L'adresse email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<any>} Les données retournées par l'API (token + user), ou null en cas d'échec.
 * @throws {Error} Lance une erreur si l'API retourne un statut non OK (ex: email déjà utilisé).
 *
 * @example
 * const data = await register("Alice", "alice@email.com", "motdepasse123");
 */

export async function register(name: string, email: string, password: string) {
    const body = {
        name: name,
        email: email,
        password: password,
        role: "owner"
    };
    const data = await fetchService(false, "/auth/register", "POST", body);
    if (data) {
        const cookiesStore = await cookies();
        cookiesStore.set("token", data.token);
        cookiesStore.set("user", JSON.stringify(data.user));
    }
    return data
}

/**
 * Connecte un utilisateur existant et stocke son token et ses informations en cookie.
 *
 * @param {string} email - L'adresse email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<any>} Les données retournées par l'API (token + user), ou null en cas d'échec.
 * @throws {Error} Lance une erreur si les identifiants sont invalides.
 *
 * @example
 * const data = await login("alice@email.com", "motdepasse123");
 */

export async function login(email: string, password: string) {
    const body = {
        email: email,
        password: password
    };
    const data = await fetchService(false, "/auth/login", "POST", body);
    if (data) {
        const cookiesStore = await cookies();
        cookiesStore.set("token", data.token);
        cookiesStore.set("user", JSON.stringify(data.user));
    }
    return data
}