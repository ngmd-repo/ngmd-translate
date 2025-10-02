import { NgDocGlobalKeyword } from '@ng-doc/core';

import { DocsKeywords } from '../categories/keywords';

const GlobalKeywords: Record<string, NgDocGlobalKeyword> = {
  transloco: {
    url: 'https://jsverse.gitbook.io/transloco/additional-functionality/loading-template',
    title: '@jsverse/transloco',
  },
  'translate-handler': {
    url: 'https://jsverse.gitbook.io/transloco/additional-functionality/utility-functions#translate',
    title: 'translate',
  },
  TranslocoService: {
    url: 'https://jsverse.gitbook.io/transloco/core-concepts/language-api',
  },
  TranslocoOptionsConfig: {
    url: 'https://jsverse.gitbook.io/transloco/getting-started/config-options',
  },
};

export const AppKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  GlobalKeywords,
  DocsKeywords,
);
