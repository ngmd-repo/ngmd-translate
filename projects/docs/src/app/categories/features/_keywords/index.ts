import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const FeaturesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/features', [
  'TranslationTranspilerPage',
  'WithCacheVersionPage',
]);
