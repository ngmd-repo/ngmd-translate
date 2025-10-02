import { translate } from '@jsverse/transloco';
import { TranslateKey } from 'i18n';

import { TOptionalTranslate } from '../components';
import { Translate } from '../models';
import { HashMap, TranslateMap } from '../types';

function getTranslateValueByPath(key: string, languageMap: TranslateMap): object | string | null {
  if (!key || typeof key !== 'string') return null;

  const translateValue: any = key.split('.').reduce((map: any, k: string) => map?.[k], languageMap);

  return translateValue;
}

// * Public

export function getTranslate(key: TranslateKey, params: HashMap = null, lang?: string): string {
  return translate(key, params, lang);
}

export function isTranslatePath(path: string, languageMap: TranslateMap): boolean {
  return Boolean(getTranslateValueByPath(path, languageMap));
}

export function isTranslateKey(key: string, languageMap: TranslateMap): key is TranslateKey {
  return typeof getTranslateValueByPath(key, languageMap) === 'string';
}

export function isTranslateModel(object: any): object is Translate {
  return (
    Boolean(object) &&
    object instanceof Object &&
    Object.keys(new Translate(null)).every(k => k in object)
  );
}

export function isOptionalTranslate(value: unknown): value is TOptionalTranslate {
  const isString: boolean = typeof value === 'string';

  return isString || isTranslateModel(value);
}
