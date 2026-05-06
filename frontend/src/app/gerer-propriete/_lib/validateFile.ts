/** Types MIME acceptés pour l'upload d'images. */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

/** Taille maximale autorisée pour un fichier uploadé (5 Mo). */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Valide un fichier image avant son upload.
 *
 * Vérifie que le type MIME est autorisé (jpeg, png, webp)
 * et que la taille ne dépasse pas 5 Mo.
 *
 * @param {File} file - Le fichier à valider.
 * @returns {string | null} Un message d'erreur si le fichier est invalide, null s'il est valide.
 *
 * @example
 * const error = validateFile(file);
 * if (error) {
 *   console.error(error); // "Format non supporté (jpg, png, webp uniquement)"
 * }
 */

export default function validateFile(file: File){
    if (!ALLOWED_TYPES.includes(file.type)) return "Format non supporté (jpg, png, webp uniquement)";
    if (file.size > MAX_FILE_SIZE) return "Fichier trop lourd (5 MB max)";
    return null;
}