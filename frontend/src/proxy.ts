import { NextRequest, NextResponse } from 'next/server'
import { cookies} from "next/headers";

// Routes accessibles sans authentification
const privateRoutes = ['/gerer-propriete', '/favoris', '/messagerie']
const loginRoutes = ['/login','/register']

/**
 * Middleware Next.js exécuté côté serveur sur chaque requête entrante.
 * Gère la protection des routes en vérifiant la présence du token JWT
 * dans les cookies et redirige l'utilisateur selon son état de connexion.
 *
 * Comportement :
 * - Non connecté + route protégée → redirige vers "/"
 * - Connecté + route publique (login) → redirige vers "/dashboard"
 * - Tous les autres cas → laisse passer la requête normalement
 */
export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token");
    const isPrivateRoute = privateRoutes.includes(request.nextUrl.pathname)
    const isLoginPage = loginRoutes.includes(request.nextUrl.pathname)

    // Utilisateur non connecté tentant d'accéder à une page protégée
    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Utilisateur déjà connecté tentant d'accéder à la page de login
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

/**
 * Configuration du matcher : définit sur quelles routes le middleware s'applique.
 * Exclut les routes internes Next.js, les fichiers statiques et les favicons
 * pour éviter d'intercepter des ressources qui n'ont pas besoin d'authentification.
 */
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads|.*\\..*).*)'],
}