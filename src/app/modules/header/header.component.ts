import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CurrenciesService } from '../currencies/services/currencies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private currenciesService: CurrenciesService
  ){}

  goToHomePage(){
    this.router.navigate([''])
  }
  goToCurrencyDetails(currency: string){
    this.currenciesService.selectedCurrency.next(currency)
    this.router.navigate(['/currencies/currencies-details']);

  }


}
