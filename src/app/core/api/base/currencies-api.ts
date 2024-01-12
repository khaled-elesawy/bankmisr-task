import { Observable } from "rxjs";

import { IApiCurrenciesRes } from "../interfaces/api-currencies-res.interface";


export abstract class CurrenciesApi{

    abstract getAvailableCurrencies(): Observable<IApiCurrenciesRes>;
    abstract getCurrencyDetails(baseCurriencyCode: string): Observable<IApiCurrenciesRes>;
    abstract convertCurrency(baseCurriencyCode: string, targetCurrencyCode: string, amount: number): Observable<IApiCurrenciesRes>;
    abstract getSingleCurrencyHistoricalData(baseCurriencyCode: string, selectedDate: string): Observable<IApiCurrenciesRes>;
    abstract getHistoricalData(baseCurriencyCode: string, targetCurrencyCode: string, selectedDate: string): Observable<IApiCurrenciesRes>;
}

