import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesDetailsComponent } from './components/currencies-details/currencies-details.component';
import { CurrenciesConverterComponent } from './components/currencies-converter/currencies-converter.component';
import { CurrenciesRoutingModule } from './currencies-routing.module';
import { ApiModule } from 'src/app/core/api/api.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    CurrenciesDetailsComponent,
    CurrenciesConverterComponent
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    ApiModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,

  ],
  exports: [
    CurrenciesDetailsComponent,
    CurrenciesConverterComponent
  ]
})
export class CurrenciesModule { }
