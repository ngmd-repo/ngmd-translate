import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OptionalTranslatePipe, Translate, TranslatePipe, TranslateService } from '@ngmd/translate';
import { TranslateKey } from 'i18n';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    // TranslateComponent,
    TranslatePipe,
    OptionalTranslatePipe,
    // TranslateAsyncPipe,
    // OptionalTranslateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class AppComponent {
  private translateService: TranslateService = inject(TranslateService);
  protected optionalString: string = 'Hello STRING world!';
  protected optionalKey: TranslateKey = 'greeting';
  protected optionalModel: Translate = new Translate('auth.registration-btn');

  constructor() {
    setTimeout(() => {
      this.translateService.setLanguage('fr');
      console.log('SET');
    }, 1000);
  }
}
