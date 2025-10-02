import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateKey } from 'i18n';
import { map, Observable } from 'rxjs';

import { TOptionalTranslate } from '../components';
import { isOptionalTranslate, isTranslateModel } from '../handlers';
import { logMessage } from '../handlers/translate.messages.handlers';
import { TRANSLATE_CONFIG } from '../tokens';
import { HashMap, TranslateConfig, TranslateMap } from '../types';

@Injectable()
export class TranslateService {
  private config: TranslateConfig = inject(TRANSLATE_CONFIG);
  private translocoService: TranslocoService = inject(TranslocoService);
  public lang: Signal<string> = toSignal(
    // ? Есть langChanges$ (https://jsverse.gitbook.io/transloco/core-concepts/language-api#langchangesusd). Но он эмитит событие о смене языка до того, как сделает запрос за объектом с переводами. И если ориентироваться на langChanges$, всегда будет старое значение при вызове getTranslation. Пришлось делать такой колхоз.
    this.translocoService
      .selectTranslation()
      .pipe(map(() => this.translocoService.getActiveLang())),
  );

  public getTranslate(
    key: TranslateKey,
    params: HashMap = null,
    lang: string = this.translocoService.getActiveLang(),
  ): string {
    return this.translocoService.translate(key, params, lang);
  }

  public getTranslate$(key: TranslateKey, params?: HashMap, lang?: string): Observable<string> {
    return this.translocoService.selectTranslate(key, params, lang);
  }

  public getOptionalTranslate(value: TOptionalTranslate, lang?: string): string {
    switch (true) {
      case this.isTranslateKey(value as TranslateKey): {
        return this.getTranslate(value as TranslateKey, null, lang);
      }
      case isTranslateModel(value): {
        const { key, params } = value;

        return this.getTranslate(key, params, lang);
      }
      default: {
        return value;
      }
    }
  }

  public setLanguage(candidateLang: string): void {
    const { fallbackLang } = this.config;
    const availableLangs: string[] = this.translocoService.getAvailableLangs() as string[];
    const isAvailableLanguage: boolean = availableLangs.includes(candidateLang);
    const language: string = isAvailableLanguage ? candidateLang : fallbackLang;

    if (!isAvailableLanguage)
      logMessage('unavailable-set-lang', { lang: candidateLang, availableLangs, fallbackLang });

    this.translocoService.setActiveLang(language);
  }

  public isTranslatePath(key: string): key is TranslateKey {
    const translateMap: TranslateMap = this.translocoService.getTranslation(this.lang());
    const path: string = Object.keys(translateMap).find(k => k.startsWith(key));

    return Boolean(path);
  }

  public isTranslateKey(key: any): key is TranslateKey {
    const translateMap: TranslateMap = this.translocoService.getTranslation(this.lang());

    return key in translateMap;
  }

  public isOptionalTranslate(value: unknown): value is TOptionalTranslate {
    return isOptionalTranslate(value);
  }
}
