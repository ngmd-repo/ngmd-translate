/* eslint-disable @typescript-eslint/naming-convention */
import { TranslocoOptions } from '@jsverse/transloco';

type TAddPrefix<Prefix extends string, Key extends string> = [Prefix] extends [never]
  ? `${Key}`
  : `${Prefix}.${Key}`;
export type TObjectPossibleKeyPaths<T extends object, Prefix extends string = never> =
  | {
      [P in string & keyof T]: T[P] extends object
        ? TObjectPossibleKeyPaths<T[P], TAddPrefix<Prefix, P>>
        : never;
    }[string & keyof T]
  | Prefix;
export type TRestObject<
  T extends Record<string, any>,
  Search extends string,
> = Search extends `${infer Begin}.${infer Rest}`
  ? T[Begin] extends object
    ? TRestObject<T[Begin], Rest>
    : never
  : T[Search] extends object
    ? T[Search]
    : never;
export type TObjectKeyPaths<T extends object, Prefix extends string = never> = {
  [P in string & keyof T]: T[P] extends object
    ? TObjectKeyPaths<T[P], TAddPrefix<Prefix, P>>
    : TAddPrefix<Prefix, P>;
}[string & keyof T];
export type TranslateMap = {
  [key: string]: TranslateMap | string;
};
export type TranslateDBType = Record<string, Record<string, TranslateMap | string>>;
export type TranslateOptions = {
  availableLangs: string[];
  fallbackLang: string;
  baseUrl: string;
  withVersion?: boolean;
};
export type TranslocoOptionsConfig = Omit<TranslocoOptions['config'], 'availableLangs'>;
export type TranslateConfig = TranslateOptions & TranslocoOptionsConfig;
export type TranslateFn = (key: string, params?: HashMap, lang?: string) => string;
export type HashMap<T = any> = Record<string, T>;
