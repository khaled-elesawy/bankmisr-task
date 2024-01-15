import { Component, OnInit } from '@angular/core';
import { CurrenciesApi } from 'src/app/core/api/base/currencies-api';
import { CurrenciesService } from '../../services/currencies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currencies-details',
  templateUrl: './currencies-details.component.html',
  styleUrls: ['./currencies-details.component.scss']
})
export class CurrenciesDetailsComponent implements OnInit {

  selectedCurrency = '';
  singleCurrencyDetails = null;
  errorMessage = null;
  currenciesRates: any;
  isLoading = false;
  lastSelectedCurrency: string | null = null;
  showSpecificDate = false;
  specificDateForm: FormGroup;
  maxSpecificDate = new Date();
  minSpecificDate = new Date();
  yearRange: string;
  constructor(
    private currenciesService: CurrenciesService,
    private currenciesApi: CurrenciesApi,
    private formBuilder: FormBuilder
  ) {
    this.specificDateForm = this.formBuilder.group({
      selectedDate: [null, Validators.required],
    });
    this.maxSpecificDate.setDate(this.maxSpecificDate.getDate());
    this.minSpecificDate.setFullYear(this.minSpecificDate.getFullYear() - 20);
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20; 
    const endYear = currentYear

    this.yearRange = `${startYear}:${endYear}`;
  }

  ngOnInit(): void {
    this.currenciesService.selectedCurrency.subscribe(
      res => {
        if (res) {
          this.selectedCurrency = res;
            this.isLoading = true;
            if (this.selectedCurrency !== this.lastSelectedCurrency) {
              this.lastSelectedCurrency = this.selectedCurrency;
              this.currenciesApi.getCurrencyDetails(res).subscribe(
                (res: any) => {
                  this.isLoading = false;
                  if (res.success) {
                    this.singleCurrencyDetails = res;
                    this.errorMessage = null
                    this.currenciesRates = Object.entries(res['rates']);
                  }
                  if (!res.success && res.error) {
                    this.isLoading = false;
                    this.singleCurrencyDetails = null;
                    this.errorMessage = res.error.type
                  }
                }
              )
            }
            else {
              this.isLoading = false
            }

        }
      }
    )
  }



  onShowSpecificDate() {
    this.showSpecificDate = true
  }

  onSubmit() {
    const inputDate = new Date(this.specificDateForm.value['selectedDate']);
    const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    this.currenciesApi.getSingleCurrencyHistoricalData(this.selectedCurrency,formattedDate).subscribe(
      (res: any) => {
        this.isLoading = true
         if (res.success) {
          this.singleCurrencyDetails = res;
          this.errorMessage = null
          this.currenciesRates = Object.entries(res['rates']);
          this.isLoading = false;
        }
        if (!res.success && res.error) {
          this.isLoading = false;
          this.singleCurrencyDetails = null;
          this.errorMessage = res.error.type;
          this.isLoading = false
        }
        this.specificDateForm.reset();
        this.showSpecificDate = false
      }
    )
  }

}
