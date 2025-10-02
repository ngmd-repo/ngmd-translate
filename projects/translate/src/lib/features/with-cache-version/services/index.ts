import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, switchMap } from 'rxjs';

import {
  PlatformRequestFn,
  usePlatformRequest,
} from '../../../providers/platform-request.providers';
import { TRANSLATE_CONFIG } from '../../../tokens/translate.tokens';
import { TranslateConfig, TranslateMap } from '../../../types';
import { TranslateVersionData } from '../types';

@Injectable()
export class TranslateCacheVersionService {
  private platformReqFn: PlatformRequestFn = usePlatformRequest();
  private config: TranslateConfig = inject(TRANSLATE_CONFIG);
  private version$?: Observable<string> = null;

  public request$(lang: string): Observable<TranslateMap> {
    return this.getVersion().pipe(
      switchMap(version => {
        const baseUrl: string = `${this.config.baseUrl}/${lang}.json`;
        const url: string = `${baseUrl}?v=${version}`;

        return this.platformReqFn<TranslateMap>(url);
      }),
    );
  }

  private getVersion(): Observable<string> {
    if (!this.version$) {
      const versionUrl: string = `${this.config.baseUrl}/version.json?t=${Date.now().toString()}`;

      this.version$ = this.platformReqFn<TranslateVersionData>(versionUrl).pipe(
        map(data => data?.version || Date.now().toString()),
        catchError(() => of(Date.now().toString())),
        shareReplay(1),
      );
    }

    return this.version$;
  }
}
