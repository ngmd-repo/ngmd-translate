/**
 * ICU options parser
 */
import { TPluralFlags } from '../types';

export function parseICUOptions(raw: string): Record<string, string> {
  const entries: string[] = raw.split(/\s*(\w+|=\d+)\s*{([^}]*)}/g);
  const map: Record<string, string> = {};

  const STEP_SIZE = 3;

  for (let i: number = 1; i < entries.length; i += STEP_SIZE) {
    const key: string = entries[i];
    const val: string = entries[i + 1];

    if (key && val != null) {
      map[key] = val.trim();
    }
  }

  return map;
}

/**
 * Plural options parser
 */
export function calculatePluralFlags(lang: string, n: number): TPluralFlags {
  const mod10: number = n % 10;
  const mod100: number = n % 100;

  const endsWith1: boolean = mod10 === 1;
  const endsWith11: boolean = mod100 === 11;
  const endsWith2to9: boolean = mod10 >= 2 && mod10 <= 9;
  const endsWith11to19: boolean = mod100 >= 11 && mod100 <= 19;
  const isZeroValue: boolean = n === 0;
  const isOneValue: boolean = n === 1;
  const endsWith1to19: boolean = mod100 >= 1 && mod100 <= 19;

  // Английский, немецкий, испанский, итальянский, португальский, голландский, эстонский, болгарский
  // prettier-ignore
  const simplePluralLangs: string[] = ['en', 'de', 'es', 'it', 'pt', 'nl', 'et', 'bg'];
  if (simplePluralLangs.includes(lang)) {
    return { isZero: false, isOne: isOneValue, isFew: false, isMany: false, isOther: !isOneValue };
  }

  switch (lang) {
    // Французский
    case 'fr':
      return {
        isZero: false,
        isOne: isZeroValue || isOneValue,
        isFew: false,
        isMany: false,
        isOther: !(isZeroValue || isOneValue),
      };
    // Румынский
    case 'ro': {
      return {
        isZero: false,
        isOne: isOneValue,
        isFew: isZeroValue || endsWith1to19,
        isMany: false,
        isOther: !(isOneValue || isZeroValue || endsWith1to19),
      };
    }
    // Латышский
    case 'lv': {
      return {
        isZero: isZeroValue,
        isOne: endsWith1 && !endsWith11,
        isFew: false,
        isMany: false,
        isOther: !(isZeroValue || (endsWith1 && !endsWith11)),
      };
    }
    // Литовский
    case 'lt': {
      return {
        isZero: false,
        isOne: endsWith1 && !endsWith11,
        isFew: endsWith2to9 && !endsWith11to19,
        isMany: false,
        isOther: !((endsWith1 && !endsWith11) || (endsWith2to9 && !endsWith11to19)),
      };
    }
    // По умолчанию стиль для простых языков
    default:
      return {
        isZero: false,
        isOne: isOneValue,
        isFew: false,
        isMany: false,
        isOther: !isOneValue,
      };
  }
}

export function getPluralCategory(lang: string, n: number): string {
  const flags: TPluralFlags = calculatePluralFlags(lang, n);

  switch (true) {
    case flags.isZero:
      return '=0';
    case flags.isOne:
      return 'one';
    case flags.isFew:
      return 'few';
    case flags.isMany:
      return 'many';
    default:
      return 'other';
  }
}
