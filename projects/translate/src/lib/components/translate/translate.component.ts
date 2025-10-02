import { ChangeDetectionStrategy, Component, input, InputSignal, Signal } from '@angular/core';
import { translateSignal } from '@jsverse/transloco';
import { TranslateKey } from 'i18n';

import { HashMap } from '../../types';

@Component({
  selector: 'i18n-translate',
  standalone: true,
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateComponent {
  public key: InputSignal<TranslateKey> = input.required();
  public params: InputSignal<HashMap> = input(undefined);
  public translate: Signal<string> = translateSignal(this.key, this.params);
}
