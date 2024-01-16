import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrenciesApi } from 'src/app/core/api/base/currencies-api';
import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-currencies-converter',
  templateUrl: './currencies-converter.component.html',
  styleUrls: ['./currencies-converter.component.scss']
})
export class CurrenciesConverterComponent implements OnInit {

  mobileScreen = false;
  screenWidth: number = window.innerWidth;
  availableCurrenciesRates: any;
  errorMessage = null;
  isLoading = false;
  conversionForm: FormGroup;
  sameCurrenciesError = false;
  showCurrencyConversionDetails = false;
  currencyConversionDetails: any;
  specificDateConversionDetails: any;
  specificDateTargetCurrency = '';
  specificDateTargetCurrencyValue = '';
  conversionDate: any;
  showSpecificDate = false;
  specificDateForm: FormGroup;
  maxSpecificDate = new Date();
  minSpecificDate = new Date();
  yearRange: string;
  singleCurrencyForm: FormGroup;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (this.screenWidth < 1023) {
      this.mobileScreen = true
    }
    else {
      this.mobileScreen = false;
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private currenciesService: CurrenciesService,
    private currenciesApi: CurrenciesApi) {
    this.conversionForm = this.formBuilder.group({
      amount: [null, [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d+)?$/)
      ]],
      baseCurrency: ['EUR', Validators.required],
      targetCurrency: [null, Validators.required],
    });
    this.specificDateForm = this.formBuilder.group({
      selectedDate: [null, Validators.required],
    })
    this.maxSpecificDate.setDate(this.maxSpecificDate.getDate());
    this.minSpecificDate.setFullYear(this.minSpecificDate.getFullYear() - 20);
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const endYear = currentYear;
    this.yearRange = `${startYear}:${endYear}`;

    this.singleCurrencyForm = this.formBuilder.group({
      baseCurrency: [null, Validators.required],
    })

  }

  ngOnInit(): void {
    if (this.screenWidth < 1023) {
      this.mobileScreen = true
    }
    else {
      this.mobileScreen = false;
    }
    this.currenciesApi.getAvailableCurrencies().subscribe(
      (res: any) => {
        console.log(res)
        this.isLoading = true;
        if (res.success) {
          this.isLoading = false;
          this.availableCurrenciesRates = Object.entries(res['rates']);
          this.availableCurrenciesRates.unshift(
            ['EUR', 0]
          )
        }
        if (!res.success && res.error) {
          this.isLoading = false;
          this.errorMessage = res.error.info
        }
      }
    )


  }

  onSelectSingleCurrency(){
    this.specificDateConversionDetails = null;
    this.currencyConversionDetails = null;
    this.errorMessage = null;
    this.sameCurrenciesError = false;
    this.conversionForm.reset()
  }

  onSubmitConversionForm() {
    if(this.conversionForm.value['baseCurrency'] == this.conversionForm.value['targetCurrency']){
      this.sameCurrenciesError = true;
      this.errorMessage = null;
      return;
    }
    this.sameCurrenciesError = false;
    this.isLoading = true;

    this.currenciesApi.convertCurrency(
      this.conversionForm.value['baseCurrency'],
      this.conversionForm.value['targetCurrency'],
      this.conversionForm.value['amount']
    ).subscribe(
      (res: any) => {
        console.log(res)
        if (res.success) {
          this.isLoading = false;
          this.showCurrencyConversionDetails = true;
          this.currencyConversionDetails = res;
          let conversionDate = new Date(this.currencyConversionDetails['info']['timestamp'] * 1000);
          let formattedConversionDate = conversionDate.getFullYear() + '-' +
            ('0' + (conversionDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + conversionDate.getDate()).slice(-2);
          console.log(formattedConversionDate)
          this.conversionDate = formattedConversionDate;

          this.errorMessage = null;

        }
        if (!res.success && res.error) {
          this.isLoading = false;
          this.currencyConversionDetails = null;
          this.errorMessage = res.error.type;
        }
      }
    )
  }

  onShowSpecificDate() {
    this.showSpecificDate = true;
  }

  onSubmitSpecificDateForm() {
    const inputDate = new Date(this.specificDateForm.value['selectedDate']);
    const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    this.currenciesApi.getHistoricalData(
      this.currencyConversionDetails['query']['from'],
      this.currencyConversionDetails['query']['to'],
      formattedDate
    ).subscribe(
      (res: any) => {
        if (res.success) {
          this.specificDateConversionDetails = res;
          for (var currency in this.specificDateConversionDetails['rates']) {
            if (this.specificDateConversionDetails['rates'].hasOwnProperty(currency)) {
              this.specificDateTargetCurrency = currency;
              this.specificDateTargetCurrencyValue = this.specificDateConversionDetails['rates'][currency]

            }
          }
          this.errorMessage = null;
        }
        if (!res.success && res.error) {
          this.errorMessage = res.error.type;
          this.specificDateConversionDetails = null;
        }
      }
    )
  }

  onSubmitSingleCurrencyForm(){
    this.currenciesService.selectedCurrency.next(this.singleCurrencyForm.value['baseCurrency'])
    this.router.navigate(['/currencies/currencies-details']);
  }

}
