/**
 * Formate un prix numérique en chaîne de caractères avec le symbole euro.
 *
 * @param {number} price - Le prix à formater (en euros).
 * @returns {string} Le prix formaté avec le symbole "€" (ex: "120€").
 *
 * @example
 * formatPrice(85);  // "85€"
 * formatPrice(120); // "120€"
 */

export function formatPrice(price: number) {
    return `${price}€`;
}