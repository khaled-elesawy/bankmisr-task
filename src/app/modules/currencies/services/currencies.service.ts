import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  selectedCurrencies = new BehaviorSubject<any>(['USD'])
  constructor() { }
}
