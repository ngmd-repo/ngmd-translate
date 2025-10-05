import { NgDocGlobalKeyword } from '@ng-doc/core';

import { ComponentsKeywords } from './components/_keywords';
import { FeaturesKeywords } from './features/_keywords';
import { HelpersKeywords } from './helpers/_keywords';
import { ModelsKeywords } from './models/_keywords';
import { PipesKeywords } from './pipes/_keywords';
import { ProvidersKeywords } from './providers/_keywords';
import { TokensKeywords } from './tokens/_keywords';
import { TranslateServiceKeywords } from './translate-service/_keywords';
import { TypesKeywords } from './types/_keywords';

export const DocsKeywords: Record<string, NgDocGlobalKeyword> = Object.assign(
  {},
  HelpersKeywords,
  ModelsKeywords,
  ComponentsKeywords,
  FeaturesKeywords,
  TranslateServiceKeywords,
  TokensKeywords,
  PipesKeywords,
  ProvidersKeywords,
  TypesKeywords,
);
