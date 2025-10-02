import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationConfig,
  EnvironmentProviders,
  inject,
  PLATFORM_ID,
  provideAppInitializer,
} from '@angular/core';
import {
  getBrowserLang,
  provideTransloco,
  TranslocoOptions,
  TranslocoService,
} from '@jsverse/transloco';
import { firstValueFrom, map } from 'rxjs';

import { provideTranslationTranspiler } from '../features/translation-transpiler';
import { TranslocoHttpLoader } from '../loaders/transloco-http.loader';
import { TRANSLATE_CONFIG } from '../tokens';
import { TranslateConfig } from '../types';

function getLanguageToLoad(config: TranslateConfig, platformId: object): string {
  if (!isPlatformBrowser(platformId)) return config.defaultLang;

  const browserLang: string = getBrowserLang();

  return browserLang && config.availableLangs.includes(browserLang)
    ? browserLang
    : config.defaultLang;
}

function createTranslateLoader(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const translocoService: TranslocoService = inject(TranslocoService);
    const config: TranslateConfig = inject(TRANSLATE_CONFIG);
    const platformId: object = inject(PLATFORM_ID);
    const langToLoad: string = getLanguageToLoad(config, platformId);

    return firstValueFrom(translocoService.load(langToLoad).pipe(map((): void => void 0)));
  });
}

export function addTranslocoProvider(
  providers: ApplicationConfig['providers'],
  config: TranslateConfig,
): void {
  const translocoOptions: TranslocoOptions = {
    loader: TranslocoHttpLoader,
    config,
  };

  providers.push(
    provideTransloco(translocoOptions),
    provideTranslationTranspiler(),
    createTranslateLoader(),
  );
}
