import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

import { isTranslateModel } from '../../handlers/translate.handlers';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslateService } from '../../services';
import { TOptionalTranslate, TOptionalTranslateType } from './types';

@Component({
  selector: 'i18n-optional-translate',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './optional-translate.component.html',
  styleUrl: './optional-translate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionalTranslateComponent {
  protected translateService: TranslateService = inject(TranslateService);
  public translate: InputSignal<TOptionalTranslate> = input.required();
  public type: Signal<TOptionalTranslateType> = computed(() => this.computedTranslate());

  private computedTranslate(): TOptionalTranslateType {
    switch (true) {
      case this.translateService.isTranslateKey(this.translate()): {
        return 'translate-key';
      }
      case isTranslateModel(this.translate()): {
        return 'translate-model';
      }
      default: {
        return 'string';
      }
    }
  }
}
