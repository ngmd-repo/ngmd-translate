import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const TypesKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/types', [
  'TranslateDBType',
  'TranslateMap',
  'TranslateKey',
  'HashMap',
  'TOptionalTranslate',
]);
