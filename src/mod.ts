import { syllabify, getAksaraBySyllables } from "./utils.ts";
import { regexAnakHurufMap, regexIndukHurufMap } from "./regex.ts";
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

export function getAksara(latin: string): string {
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
export function getLatin(aksara: string): string {
  let latin: string = aksara;

  // Induk huruf
  latin = latin.replace(regexIndukHurufMap.a, "a");
  latin = latin.replace(regexIndukHurufMap.ka, "ka");
  latin = latin.replace(regexIndukHurufMap.ga, "ga");
  latin = latin.replace(regexIndukHurufMap.pa, "pa");
  latin = latin.replace(regexIndukHurufMap.ba, "ba");
  latin = latin.replace(regexIndukHurufMap.ma, "ma");
  latin = latin.replace(regexIndukHurufMap.ta, "ta");
  latin = latin.replace(regexIndukHurufMap.da, "da");
  latin = latin.replace(regexIndukHurufMap.na, "na");
  latin = latin.replace(regexIndukHurufMap.ca, "ca");
  latin = latin.replace(regexIndukHurufMap.ja, "ja");
  latin = latin.replace(regexIndukHurufMap.ya, "ya");
  latin = latin.replace(regexIndukHurufMap.la, "la");
  latin = latin.replace(regexIndukHurufMap.ra, "ra");
  latin = latin.replace(regexIndukHurufMap.sa, "sa");
  latin = latin.replace(regexIndukHurufMap.wa, "wa");
  latin = latin.replace(regexIndukHurufMap.ha, "ha");
  latin = latin.replace(regexIndukHurufMap.gha, "gha");
  latin = latin.replace(regexIndukHurufMap.nga, "nga");
  latin = latin.replace(regexIndukHurufMap.nya, "nya");
  latin = latin.replace(regexIndukHurufMap.kha, "kha");

  // Anak huruf
  latin = latin.replace(regexAnakHurufMap.nengen, function (a) {
    return a.substring(0, a.length - 2) + "";
  });
  latin = latin.replace(regexAnakHurufMap.ulan_i, function (a) {
    return a.substring(0, a.length - 2) + "i";
  });
  latin = latin.replace(regexAnakHurufMap.ulan_e, function (a) {
    return a.substring(0, a.length - 2) + "é";
  }); // Perlu dipertimbangkan alternatif untuk huruf é
  latin = latin.replace(regexAnakHurufMap.bicek_e, function (a) {
    return a.substring(0, a.length - 2) + "e";
  });
  latin = latin.replace(regexAnakHurufMap.bitan_o, function (a) {
    return a.substring(0, a.length - 2) + "o";
  });
  latin = latin.replace(regexAnakHurufMap.bitan_u, function (a) {
    return a.substring(0, a.length - 2) + "u";
  });
  latin = latin.replace(regexAnakHurufMap.tekelubang, "ng");
  latin = latin.replace(regexAnakHurufMap.rejunjung, "r");
  latin = latin.replace(regexAnakHurufMap.datasan, "n");
  latin = latin.replace(regexAnakHurufMap.tekelungau, "u");
  latin = latin.replace(regexAnakHurufMap.tekelingai, "i");
  latin = latin.replace(regexAnakHurufMap.keleniah, "h");

  const regextandabaca =
    /[\,\!\@\.\*\+\?\$\^\/\\\;\:\'\"\[\]\{\}\(\)\%\#\$\^\-\+\=\_]/;
  latin = latin.replace(regextandabaca, "");
  return latin;
}
