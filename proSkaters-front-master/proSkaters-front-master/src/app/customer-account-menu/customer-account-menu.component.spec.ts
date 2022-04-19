import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountMenuComponent } from './customer-account-menu.component';

describe('CustomerAccountMenuComponent', () => {
  let component: CustomerAccountMenuComponent;
  let fixture: ComponentFixture<CustomerAccountMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAccountMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
