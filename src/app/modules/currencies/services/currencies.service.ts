import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  selectedCurrency = new BehaviorSubject<any>('USD')
  constructor() { }
}
