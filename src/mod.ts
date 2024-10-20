import { syllabify, getAksaraBySyllables } from "./utils.ts";

/**
 * Converts a given Latin script string into its corresponding Aksara Lampung script.
 *
 * This function takes a string in Latin script, splits it into words, and then
 * converts each word into its corresponding Lampung script representation. The
 * conversion is done by first syllabifying each word and then mapping each
 * syllable to its Aksara Lampung equivalent.
 *
 * @param {string} latin - The input string in Latin script.
 * @returns {string} The converted string in aksara Lampung script.
 */

export function getAksara(latin: string) {
  const words = latin.split(" ");

  const aksaraWords = words.map((word) => {
    return syllabify(word)
      .map((syllable) => getAksaraBySyllables(syllable))
      .join("");
  });
  return aksaraWords.join(" ");
}

/**
 * Converts a given Aksara Lampung script string into its corresponding Latin script.
 *
 * This function takes a string in Aksara Lampung script then return its Latin equivalent.
 *
 * @param {string} aksara - The input string in Aksara Lampung script.
 * @returns {string} The converted string in Latin script.
 */
export function getLatin(aksara: string) {
  // TODO: implement aksara to latin conversion

  return aksara;
}

/**
 * Returns the font name for a given font.
 *
 * @param {string} name - The name of the font.
 * @returns {string} The font name.
 */
export function getFont(name: string = "Lampung Suarnadipa"): {
  class: string;
} {
  if (name === "Lampung Suarnadipa") {
    return { class: "lampung-suarnadipa" };
  }
  if (name === "Lampung Kaganga") {
    return { class: "lampung-kaganga" };
  }

  return { class: "lampung-suarnadipa" };
}
