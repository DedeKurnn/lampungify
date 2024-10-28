import { regexPatterns } from "./regex.ts";

/**
 * Splits a syllable into parts based on vowel pairs, allowing specified exceptions.
 *
 * This function checks if a syllable contains consecutive vowels (vowel pairs)
 * and splits the syllable at the first occurrence of a vowel pair if it is
 * surrounded by non-vowel characters. Users can specify vowel pairs to be
 * ignored during the splitting process.
 *
 * @param {string} syllable - The syllable to be split. It should contain
 *                            vowels from the specified set.
 * @param {string[]} ignores - An array of vowel pairs to be ignored during
 *                             the splitting process.
 * @returns {string[]} An array containing the split syllable parts. If no
 *                     vowel pair is found, the original syllable is returned
 *                     in an array.
 *
 * @example
 * // returns ['pa', 'ra']
 * splitVowelPairs('para', []);
 *
 * @example
 * // returns ['p', 'ai']
 * splitVowelPairs('pai', ['ai']);
 *
 */
export const splitVowelPairs = (
  syllable: string,
  ignores: string[]
): string[] => {
  const ignoresPattern = ignores.length > 0 ? `(${ignores.join("|")})` : "";
  const vowelPairRegex = new RegExp(
    `(?<=[^aiueoéê])(?!(?:${ignoresPattern}))[aiueoéê]{2}(?=[^aiueoéê])`
  );

  const match = syllable.match(vowelPairRegex);
  if (match) {
    const splitIndex = syllable.search(/[aiueoéê](?=[aiueoéê])/);
    return [syllable.slice(0, splitIndex + 1), syllable.slice(splitIndex + 1)];
  }
  return [syllable];
};

/**
 * Syllabifies a string of words into an array of syllables.
 *
 * This function takes a string containing one or more words and breaks it
 * down into its constituent syllables based on defined patterns. It applies
 * special rules for handling certain syllable endings and vowel pairs.
 *
 * @param {string} words - The input string containing words to be syllabified.
 * @returns {string[]} An array of syllables extracted from the input words.
 *
 * @example
 * // returns ['a', 'ni', 'mal']
 * syllabify('animal');
 *
 * @example
 * // returns ['ko', 'ng', 'ru']
 * syllabify('kongru');
 *
 * @example
 * // returns ['pa', 'ra', 'puh']
 * syllabify('parapuh');
 *
 * @example
 * // returns ['au', 'ra', 'ge']
 * syllabify('aurage');
 */
export const syllabify = (words: string): string[] => {
  const syllableRegex =
    /[^aiueoéê]*[aiueoéê]+(?:ng|ny|kh|gh)?(?:[^aiueoéê]*$|[^aiueoéê](?=[^aiueoéê]))?/gi;
  const syllables: string[] = words
    .split(" ")
    .flatMap((word) => word.match(syllableRegex) || []);
  for (let i = 0; i < syllables.length - 1; i++) {
    const currentSyllable = syllables[i];
    const nextSyllable = syllables[i + 1];

    const isSpecialEnding = (syllable: string, patterns: string[]) =>
      patterns.some(
        (pattern) => syllable.endsWith(pattern) && !syllable.startsWith(pattern)
      );

    const hasVowelStart = (syllable: string) => /^[aiueoéê]/.test(syllable);

    const splitSyllable = (index: number, cutIndex: number) => {
      syllables[index] = currentSyllable.slice(0, cutIndex);
      syllables[index + 1] = currentSyllable.slice(cutIndex) + nextSyllable;
    };

    const patterns1 = ["ng", "ny"];
    const patterns2 = ["ng", "ny", "gh", "kh"];

    if (
      isSpecialEnding(currentSyllable.slice(0, -1), patterns1) &&
      /[aiueoéê]/.test(nextSyllable)
    ) {
      splitSyllable(i, -1);
    }

    if (
      isSpecialEnding(currentSyllable, patterns2) &&
      hasVowelStart(nextSyllable)
    ) {
      splitSyllable(i, -2);
    }

    syllables.map((syllable) => {
      if (
        /(?<=[^aiueoéê])(?!(ai|au))[aiueoéê]{2}(?=[^aiueoéê])/.test(syllable)
      ) {
        console.log("success: " + syllable);
      }
    });
  }

  return syllables.flatMap((syllable) =>
    splitVowelPairs(syllable, ["ai", "au"])
  );
};

export const getAksaraBySyllables = (word: string) => {
  let aksara = word
    .toLowerCase()
    .replaceAll("v", "p")
    .replaceAll("f", "p")
    .replaceAll("x", "ks")
    .replaceAll("z", "j");

  // Replace certain consonant with prefix
  const patternPrefix = (aksara: string, pattern: RegExp, prefix: string) => {
    if (aksara.match(/nya(?![ionuh])/gi)) {
      return aksara.replace(/nya(?![ionuh])/gi, "N");
    }

    return aksara.replace(pattern, (a: string) => {
      return prefix + (a[2] ? a[2] : "");
    });
  };

  // Replace certain vowel with suffix diacritic
  const patternSuffix = (aksara: string, pattern: RegExp, suffix: string) => {
    if (aksara.match(/Nah/gi)) {
      return aksara.replace(/ah/gi, "x");
    }

    if (aksara.match(/Nr/gi)) {
      return aksara.replace(/r/gi, "R");
    }

    if (aksara.match(/Nau/gi)) {
      return aksara.replace(/au/gi, "W");
    }

    return aksara.replace(pattern, function (a) {
      return (
        (a[0].search(regexPatterns.vocal) != -1 ? a[0] : "") +
        suffix +
        (a[2] ? a[2] : "")
      );
    });
  };

  //Replace certain vowel in the middle of word with diacritic
  const patternDiacritic = (
    aksara: string,
    pattern: RegExp,
    diacritic: string
  ) => {
    if (pattern === regexPatterns.aux) {
      return aksara.replace(pattern, function (a) {
        return (a[1].search(regexPatterns.vocal) != -1 ? a[0] : "") + diacritic;
      });
    }

    if (pattern === regexPatterns.ahx || pattern === regexPatterns.arx) {
      return aksara.replace(pattern, (a) => {
        return a[0] + diacritic;
      });
    }
    return aksara.replace(pattern, function (a) {
      return (a[0].search(regexPatterns.vocal) != -1 ? a[0] : "") + diacritic;
    });
  };

  const patternDigraph = (word: string) => {
    return word.replace(regexPatterns.digraph, (a) => `${a[0]}/${a[1]}`);
  };

  aksara = patternDigraph(aksara);

  // Replace all Q with K
  aksara = aksara.replace(/Q/gi, "k");

  // Replace all é with E
  aksara = aksara.replace(/é/gi, "E");

  aksara = patternPrefix(aksara, regexPatterns.ng, "G");
  aksara = patternPrefix(aksara, regexPatterns.ny, "N");
  aksara = patternPrefix(aksara, regexPatterns.gh, "H");

  aksara = patternSuffix(aksara, regexPatterns.ang, "X");
  aksara = patternSuffix(aksara, regexPatterns.an, "A");
  aksara = patternSuffix(aksara, regexPatterns.ah, "x");
  aksara = patternSuffix(aksara, regexPatterns.ar, "R");
  aksara = patternSuffix(aksara, regexPatterns.ai, "I");
  aksara = patternSuffix(aksara, regexPatterns.au, "W");

  aksara = aksara.replace(regexPatterns.xawal, function (a) {
    return a[0] + a[1] + "/" + a[2] + a[3];
  });

  aksara = aksara.replace(regexPatterns.x, function (a) {
    return a.search(regexPatterns.tandabaca) != -1
      ? a.substring(0, a.length - 1) + "/" + a.substring(a.length - 1)
      : a + "/";
  });

  aksara = patternDiacritic(aksara, regexPatterns.xng, "X");
  aksara = patternDiacritic(aksara, regexPatterns.anx, "A");
  aksara = patternDiacritic(aksara, regexPatterns.ahx, "x");
  aksara = patternDiacritic(aksara, regexPatterns.arx, "R");
  aksara = patternDiacritic(aksara, regexPatterns.aix, "I");
  aksara = patternDiacritic(aksara, regexPatterns.aux, "W");

  aksara = aksara.replace(regexPatterns.a, function (a) {
    return a[0] + (a[2] ? a[2] : "");
  }); //karakter 1 dan 3 harusnya tidak dihapus

  aksara = aksara.replace(regexPatterns.awal, function (a) {
    return "a" + a;
  });

  return aksara;
};
