import {
  ApplicationConfig,
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
} from '@angular/core';

import { TRANSLOCO_DEFAULT_OPTIONS } from '../constants/translate.constants';
import { addCacheVersionProvider } from '../features/with-cache-version';
import { logMessage } from '../handlers/translate.messages.handlers';
import { TranslateService } from '../services';
import { TRANSLATE_CONFIG, TRANSLATE_DB } from '../tokens';
import { TranslateConfig, TranslateDBType } from '../types';
import { providePlatformRequest } from './platform-request.providers';
import { addTranslocoProvider } from './transloco.providers';

function validateLanguageConfig(config: TranslateConfig): void {
  const { availableLangs, fallbackLang, defaultLang } = config;
  const isAvailableDefaultLang: boolean = availableLangs.includes(defaultLang);

  if (!isAvailableDefaultLang) {
    config.defaultLang = fallbackLang;
    logMessage('unavailable-default-lang', { defaultLang, availableLangs });
  }
}

function validateConfig(cfg: TranslateConfig): void {
  validateLanguageConfig(cfg);
}

function makeConfig(candidate: TranslateConfig): TranslateConfig {
  const config: TranslateConfig = Object.assign({}, TRANSLOCO_DEFAULT_OPTIONS, candidate);

  validateConfig(config);

  return config;
}

function addConfigProvider(
  providers: ApplicationConfig['providers'],
  config: TranslateConfig,
): void {
  const provider: Provider = {
    provide: TRANSLATE_CONFIG,
    useValue: config,
  };

  providers.push(provider);
}

function addDBProvider(providers: ApplicationConfig['providers'], db: TranslateDBType): void {
  const initDBProvider: Provider = {
    provide: TRANSLATE_DB,
    useValue: db,
  };

  providers.push(initDBProvider);
}

// * Providers

export function provideTranslate<T extends TranslateDBType>(
  db: T,
  config: TranslateConfig,
): EnvironmentProviders {
  const cfg: TranslateConfig = makeConfig(config);
  const providers: ApplicationConfig['providers'] = [
    providePlatformRequest(),
    TranslateService,
  ];

  addConfigProvider(providers, cfg);
  addDBProvider(providers, db);
  addTranslocoProvider(providers, cfg);
  addCacheVersionProvider(providers, cfg);

  return makeEnvironmentProviders(providers);
}
