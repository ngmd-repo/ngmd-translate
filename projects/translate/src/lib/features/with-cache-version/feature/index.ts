import { ApplicationConfig, Provider } from '@angular/core';

import { TranslateConfig } from '../../../types';
import { TranslateCacheVersionService } from '../services';

export function withCacheVersion(): Provider {
  return TranslateCacheVersionService;
}

export function addCacheVersionProvider(
  providers: ApplicationConfig['providers'],
  cfg: TranslateConfig,
): void {
  if (cfg.withVersion) providers.push(withCacheVersion());
}
