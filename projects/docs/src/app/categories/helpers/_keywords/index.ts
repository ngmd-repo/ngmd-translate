import { NgDocGlobalKeyword } from '@ng-doc/core';

import { makeModuleKeywords } from '../../../../common/handlers';

export const HelpersKeywords: Record<string, NgDocGlobalKeyword> = makeModuleKeywords('/helpers', [
  'getTranslate',
  'isTranslatePath',
  'isTranslateKey',
  'isTranslateModel',
  'isOptionalTranslate',
]);
