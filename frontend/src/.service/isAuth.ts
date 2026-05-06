"use server"

import {cookies} from "next/headers";

/**
 * Vérifie si un utilisateur est actuellement authentifié.
 *
 * Se base sur la présence d'un cookie "token" pour déterminer l'état de connexion.
 *
 * @returns {Promise<boolean>} true si un token est présent dans les cookies, false sinon.
 *
 * @example
 * const authenticated = await isAuth();
 * if (!authenticated) redirect("/login");
 */

export async function isAuth(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    return !!token;
}