import { NgModule, Type } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { TranslateComponent } from './components';
import { TranslatePipe } from './pipes';

const imports: Type<unknown>[] = [
  TranslocoModule,
  TranslateComponent,
  TranslatePipe,
];

@NgModule({
  imports,
  exports: imports,
})
export class TranslateModule {}
