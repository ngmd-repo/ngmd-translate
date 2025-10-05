import { isDevMode } from '@angular/core';
import { TranslocoOptions } from '@jsverse/transloco';

export const DEFAULT_LANGUAGE: string = 'en';
export const DEFAULT_AVAILABLE_LANGS: string[] = [DEFAULT_LANGUAGE];

export const TRANSLOCO_DEFAULT_OPTIONS: TranslocoOptions['config'] = {
  defaultLang: DEFAULT_LANGUAGE,
  reRenderOnLangChange: true,
  prodMode: !isDevMode(),
  availableLangs: DEFAULT_AVAILABLE_LANGS,
};
