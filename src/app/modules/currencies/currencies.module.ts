import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesDetailsComponent } from './components/currencies-details/currencies-details.component';
import { CurrenciesConverterComponent } from './components/currencies-converter/currencies-converter.component';
import { CurrenciesRoutingModule } from './currencies-routing.module';



@NgModule({
  declarations: [
    CurrenciesDetailsComponent,
    CurrenciesConverterComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule
  ],
  exports: [
    CurrenciesDetailsComponent,
    CurrenciesConverterComponent
  ]
})
export class CurrenciesModule { }
