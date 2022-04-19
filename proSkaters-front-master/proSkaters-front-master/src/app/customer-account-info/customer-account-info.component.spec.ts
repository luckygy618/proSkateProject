import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountInfoComponent } from './customer-account-info.component';

describe('CustomerAccountInfoComponent', () => {
  let component: CustomerAccountInfoComponent;
  let fixture: ComponentFixture<CustomerAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAccountInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
