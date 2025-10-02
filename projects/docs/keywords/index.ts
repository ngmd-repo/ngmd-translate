import { NgDocKeywordsLoader } from '@ng-doc/core';

import { AppKeywords } from '../src/app/keywords';

export function projectKeywordsLoader(): NgDocKeywordsLoader {
  return async () => {
    return Promise.resolve(AppKeywords);
  };
}
