import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { TranslateKey } from 'i18n';

import { HashMap } from '../types';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe extends TranslocoPipe implements PipeTransform {
  public override transform(value: TranslateKey, params: HashMap = null, lang?: string): string {
    return super.transform(value, params, lang);
  }
}
