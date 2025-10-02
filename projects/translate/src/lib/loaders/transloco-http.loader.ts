import { inject, Injectable, Injector } from '@angular/core';
import { TranslocoLoader } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TranslateCacheVersionService } from '../features/with-cache-version';
import { PlatformRequestFn, usePlatformRequest } from '../providers/platform-request.providers';
import { TRANSLATE_CONFIG, TRANSLATE_DB } from '../tokens';
import { TranslateConfig, TranslateDBType, TranslateMap } from '../types';

@Injectable()
export class TranslocoHttpLoader implements TranslocoLoader {
  private translateDB: TranslateDBType = inject(TRANSLATE_DB);
  private platformReqFn: PlatformRequestFn = usePlatformRequest();
  private injector: Injector = inject(Injector);
  private config: TranslateConfig = inject(TRANSLATE_CONFIG);

  public getTranslation(lang: string): Observable<TranslateMap> {
    const isExistLang: boolean = lang in this.translateDB;

    return isExistLang ? this.getLoadedTranslate(lang) : this.loadTranslate(lang);
  }

  private getLoadedTranslate(lang: string): Observable<TranslateMap> {
    return of(this.translateDB[lang]);
  }

  private loadTranslate(lang: string): Observable<TranslateMap> {
    return this.getLoadRequest(lang).pipe(
      catchError((e: any) => of(this.translateDB[this.config.fallbackLang])),
    );
  }

  private getLoadRequest(lang: string): Observable<TranslateMap> {
    // ? Пока оставить switch, т.к. изменений больше не предвидится. Если будет расширение, сделать через токен по multi фичам и пробегаться в reduce по массиву
    switch (true) {
      case this.config.withVersion: {
        const versionService: TranslateCacheVersionService = this.injector.get(
          TranslateCacheVersionService,
        );

        return versionService.request$(lang);
      }
      default: {
        return this.platformReqFn(`${this.config.baseUrl}/${lang}.json?t=${Date.now()}`);
      }
    }
  }
}
