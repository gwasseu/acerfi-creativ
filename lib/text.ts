/**
 * Typographie française — insère un espace insécable avant les ponctuations
 * doubles françaises (`?`, `!`, `;`, `:`, `»`) et après `«` quand la source
 * contient un espace ASCII normal. Utilisation : `frenchTypo(str)` sur les
 * textes rendus (titres, paragraphes, réponses FAQ, etc.).
 *
 * Sûr pour les URLs : `https://` n'a pas d'espace avant `:` donc n'est pas
 * modifié par le premier remplacement.
 */
const NBSP = " ";

export function frenchTypo(input: string): string {
  return input
    .replace(/ ([?!;:»])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`);
}
