/**
 * Caractères considérés comme dangereux et supprimés lors de la sanitisation.
 * Inclut les caractères utilisés dans les injections HTML, JS et SQL.
 * @type {RegExp}
 */

const DANGEROUS_CHARS = /[<>"'`\\;{}()\[\]]/g;

/**
 * Nettoie une chaîne de caractères en supprimant les caractères potentiellement dangereux.
 *
 * Protège contre les injections en retirant les caractères spéciaux
 * susceptibles d'être exploités (XSS, injection SQL, etc.).
 * À appliquer sur toutes les valeurs saisies par l'utilisateur avant traitement.
 *
 * @param {string} value - La chaîne de caractères à nettoyer.
 * @returns {string} La chaîne nettoyée, sans les caractères dangereux.
 *
 * @example
 * sanitize('<script>alert("xss")</script>');
 * // → "scriptalertxss/script"
 *
 * sanitize("Appartement cosy");
 * // → "Appartement cosy" (inchangé, aucun caractère dangereux)
 */

export default function sanitize(value: string){
    return value.replace(DANGEROUS_CHARS, "");
}