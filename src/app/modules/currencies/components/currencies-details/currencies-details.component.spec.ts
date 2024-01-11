import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesDetailsComponent } from './currencies-details.component';

describe('CurrenciesDetailsComponent', () => {
  let component: CurrenciesDetailsComponent;
  let fixture: ComponentFixture<CurrenciesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrenciesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
