import {
  ApplicationConfig,
  EnvironmentProviders,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideTransloco, TranslocoOptions, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, map } from 'rxjs';

import { provideTranslationTranspiler } from '../features/translation-transpiler';
import { TranslocoHttpLoader } from '../loaders/transloco-http.loader';
import { TRANSLATE_CONFIG } from '../tokens';
import { TranslateConfig } from '../types';

function createTranslateLoader(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const translocoService: TranslocoService = inject(TranslocoService);
    const config: TranslateConfig = inject(TRANSLATE_CONFIG);

    return firstValueFrom(translocoService.load(config.defaultLang).pipe(map((): void => void 0)));
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
