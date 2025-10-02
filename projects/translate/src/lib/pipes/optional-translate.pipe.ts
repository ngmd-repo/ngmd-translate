import { inject, Pipe, PipeTransform } from '@angular/core';

import { TOptionalTranslate } from '../components';
import { TranslateService } from '../services';

@Pipe({
  name: 'optionalTranslate',
  standalone: true,
  pure: false,
})
export class OptionalTranslatePipe implements PipeTransform {
  protected translateService: TranslateService = inject(TranslateService);

  public transform(value: TOptionalTranslate, lang?: string): string {
    return this.translateService.getOptionalTranslate(value, lang);
  }
}
