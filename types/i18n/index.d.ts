declare module 'i18n' {
  import { TranslateDB } from '@app-i18n';
  import { TObjectKeyPaths } from '@ngmd/translate';

  export type TranslateKey = TObjectKeyPaths<(typeof TranslateDB)['en']>;
}
