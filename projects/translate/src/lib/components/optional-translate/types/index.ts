import { TranslateKey } from 'i18n';

import { Translate } from '../../../models/translate.model';

export type TOptionalTranslate = Translate | TranslateKey | string;
export type TOptionalTranslateType = 'string' | 'translate-key' | 'translate-model';
