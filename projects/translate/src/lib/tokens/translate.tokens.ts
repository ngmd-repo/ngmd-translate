import { InjectionToken } from '@angular/core';

import { TranslateConfig, TranslateDBType } from '../types';

export const TRANSLATE_CONFIG = new InjectionToken<TranslateConfig>('TRANSLATE_CONFIG');
export const TRANSLATE_DB = new InjectionToken<TranslateDBType>('TRANSLATE_DB');
