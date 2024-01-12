
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CurrenciesEndpointsEnum } from '../enums/currencies-endpoints.enum';




@Injectable({
  providedIn: 'root'
})
export class CurrenciesApiService {
  
  constructor(private httpClient: HttpClient) { }

  getAvailableCurrencies(){
    return this.httpClient.get(CurrenciesEndpointsEnum.availableCurrencies())
  }

  getCurrencyDetails(baseCurrencyCode: string){
    return this.httpClient.get(CurrenciesEndpointsEnum.currencyDetails(baseCurrencyCode))
  }

  convertCurrency(baseCurriencyCode: string, targetCurrencyCode: string, amount: number){
    return this.httpClient.get(CurrenciesEndpointsEnum.convertCurrency(baseCurriencyCode, targetCurrencyCode, amount))
  }

  getSingleCurrencyHistoricalData(baseCurriencyCode: string, selectedDate: string){
    return this.httpClient.get(CurrenciesEndpointsEnum.singleCurrencyHistoricalData(baseCurriencyCode, selectedDate))
  };


  getHistoricalData(baseCurriencyCode: string, targetCurrencyCode: string, selectedDate: string){
    return this.httpClient.get(CurrenciesEndpointsEnum.historicalData(baseCurriencyCode, targetCurrencyCode, selectedDate))
  }



}
