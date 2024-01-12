import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesConverterComponent } from './components/currencies-converter/currencies-converter.component';
import { CurrenciesDetailsComponent } from './components/currencies-details/currencies-details.component';


const routes: Routes = [
  {path: 'currencies-converter', component: CurrenciesConverterComponent},
  {path: 'currencies-details', component: CurrenciesDetailsComponent},
  {path: '', redirectTo: 'currencies-converter', pathMatch: 'full'}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CurrenciesRoutingModule { }
