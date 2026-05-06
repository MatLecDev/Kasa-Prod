"use server"

import {cookies} from "next/headers";
import {User} from "@/types";

/**
 * Récupère les informations de l'utilisateur actuellement connecté depuis les cookies de session.
 *
 * @returns {Promise<User | null>} L'objet utilisateur si un cookie "user" est présent, null sinon.
 *
 * @example
 * const user = await getSessionUser();
 * if (user) console.log(`Bonjour ${user.name}`);
 */

export async function getSessionUser(): Promise<User | null> {
    const cookiesStore = await cookies();
    const userCookie = cookiesStore.get("user");
    return userCookie ? JSON.parse(userCookie.value) : null;
}

/**
 * Récupère uniquement l'identifiant de l'utilisateur actuellement connecté.
 *
 * Raccourci pratique pour obtenir l'ID sans récupérer l'intégralité des données utilisateur.
 *
 * @returns {Promise<number | null>} L'identifiant de l'utilisateur connecté, ou null si non connecté.
 *
 * @example
 * const userId = await getSessionUserId();
 * if (userId) {
 *   const favorites = await getFavorites(userId);
 * }
 */

export async function getSessionUserId(): Promise<number | null> {
    const user = await getSessionUser();
    return user?.id ?? null;
}

export async function getSessionUserRole(): Promise<string | null> {
    const user = await getSessionUser();
    return user?.role ?? null;
}