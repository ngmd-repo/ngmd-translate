/* eslint-disable @typescript-eslint/naming-convention */
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export type PlatformRequestFn = <T>(url: string) => Observable<T>;
const PLATFORM_REQUEST = new InjectionToken<PlatformRequestFn>('PLATFORM_REQUEST');

export function providePlatformRequest(): Provider {
  return {
    provide: PLATFORM_REQUEST,
    useFactory(): PlatformRequestFn {
      const platformId: object = inject(PLATFORM_ID);
      const isServer: boolean = isPlatformServer(platformId);
      const http: HttpClient = inject(HttpClient);

      return <T>(url: string): Observable<T> => {
        return isServer ? (http.get(url) as Observable<T>) : ajax.getJSON(url);
      };
    },
  };
}

export function usePlatformRequest(): PlatformRequestFn {
  return inject(PLATFORM_REQUEST);
}
