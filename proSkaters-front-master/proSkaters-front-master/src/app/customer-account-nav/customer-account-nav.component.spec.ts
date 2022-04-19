import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountNavComponent } from './customer-account-nav.component';

describe('CustomerAccountNavComponent', () => {
  let component: CustomerAccountNavComponent;
  let fixture: ComponentFixture<CustomerAccountNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAccountNavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
