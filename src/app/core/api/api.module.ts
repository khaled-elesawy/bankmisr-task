import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CurrenciesApi } from './base/currencies-api';
import { CurrenciesApiService } from './services/currencies-api.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers: [
    {
      provide: CurrenciesApi,
      useClass: CurrenciesApiService
    }
  ]

})
export class ApiModule { }
