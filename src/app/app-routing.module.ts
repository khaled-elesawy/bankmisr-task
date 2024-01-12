import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'currencies',
    loadChildren: () =>
      import('./modules/currencies/currencies.module').then((m) => m.CurrenciesModule)
  },
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
