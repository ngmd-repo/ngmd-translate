import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TRANSLOCO_TRANSPILER } from '@jsverse/transloco';

import { TranslationTranspiler } from '../classes';

export function provideTranslationTranspiler(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TRANSLOCO_TRANSPILER, useClass: TranslationTranspiler },
  ]);
}
