import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslocoTranspiler } from '@jsverse/transloco';

import { TRANSLATE_CONFIG } from '../../../tokens';
import { TranslateConfig } from '../../../types';
import { TranslocoInterpolationValue } from '../types';
import { getPluralCategory, parseICUOptions } from '../utils';

@Injectable()
export class TranslationTranspiler implements TranslocoTranspiler {
  private config: TranslateConfig = inject(TRANSLATE_CONFIG);

  private activeLang: WritableSignal<string> = signal(this.config.defaultLang);

  public onLangChanged(lang: string): void {
    this.activeLang.set(lang);
  }

  public transpile({ value, params }: TranslocoInterpolationValue): string {
    const hasICUSyntax = /{\w+,\s*(plural|select),/.test(value);
    const hasInterpolation = /{{\s*\w+\s*}}/.test(value);

    if (!hasICUSyntax && !hasInterpolation) {
      return value;
    }

    if (hasICUSyntax) {
      return this.processICUSyntax(value, params ?? {});
    } else {
      return this.interpolate(value, params ?? {});
    }
  }

  /**
   * Interpolates {{param}}
   */
  private interpolate(value: string, params: Record<string, unknown>): string {
    const interpolationRegex = /{{\s*(\w+)\s*}}/g;

    return value.replace(interpolationRegex, (_: string, key: string): string => {
      return params[key] !== undefined ? String(params[key]) : '';
    });
  }

  /**
   * Handles ICU syntax: plural/select
   */
  private processICUSyntax(value: string, params: Record<string, unknown>): string {
    const icuRegex = /{(\w+),\s*(plural|select),([\s\S]+)}/g;

    return value.replace(
      icuRegex,
      (_: string, param: string, type: 'plural' | 'select', rawOptions: string) => {
        const paramValue: unknown = params[param];
        const options: Record<string, string> = parseICUOptions(rawOptions);

        switch (type) {
          case 'plural':
            return this.processPluralICU(paramValue, options);
          case 'select':
            return this.processSelectICU(paramValue, options);
          default:
            return '';
        }
      },
    );
  }

  /**
   * Handles ICU plural
   */
  private processPluralICU(paramValue: unknown, options: Record<string, string>): string {
    const number: number = Number(paramValue);

    if (Number.isNaN(number)) return '';

    const exact: string = options[`=${number}`];
    const category: string = getPluralCategory(this.activeLang(), number);

    const selected: string = exact || options[category] || options['other'] || '';

    return selected.replace(/#/g, String(number));
  }

  /**
   * Handles ICU select
   */
  private processSelectICU(paramValue: unknown, options: Record<string, string>): string {
    return options[String(paramValue)] || options['other'] || '';
  }
}
