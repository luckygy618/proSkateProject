import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ItemComponent } from './item/item.component';
import { PromoComponent } from './promo/promo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReplaceLineBreaks } from './replace-line-breaks.pipe';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './form-error/form-error.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormSuccessComponent } from './form-success/form-success.component';
import { AlertComponent } from './alert/alert.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomerAccountInfoComponent } from './customer-account-info/customer-account-info.component';
import { CustomerAccountSettingsComponent } from './customer-account-settings/customer-account-settings.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePaymentInfoComponent } from './update-payment-info/update-payment-info.component';
import { CustomerAccountMenuComponent } from './customer-account-menu/customer-account-menu.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReversePipe } from './reverse.pipe';
import { RegisterPageComponent } from './register-page/register-page.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ReceiptItemComponent } from './receipt-item/receipt-item.component';
import { PurchaseFailedComponent } from './purchase-failed/purchase-failed.component';
import { UpdatePaymentFormComponent } from './update-payment-form/update-payment-form.component';
import { CartNavComponent } from './cart-nav/cart-nav.component';
import { OrderComponent } from './order/order.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { CustomerAccountNavComponent } from './customer-account-nav/customer-account-nav.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    NavComponent,
    FooterComponent,
    PromoComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProductComponent,
    ProductListComponent,
    ProductAddComponent,
    FormErrorComponent,
    RegisterComponent,
    LoginComponent,
    FormSuccessComponent,
    AlertComponent,
    LoginPageComponent,
    CustomerAccountInfoComponent,
    CustomerAccountSettingsComponent,
    UpdatePasswordComponent,
    UpdatePaymentInfoComponent,
    CustomerAccountMenuComponent,
    ViewCartComponent,
    ShoppingCartComponent,
    CartItemComponent,
    CheckoutComponent,
    ReceiptComponent,
    ReplaceLineBreaks,
    ReversePipe,
    RegisterPageComponent,
    OrderConfirmationComponent,
    LoginRegisterComponent,
    ReceiptItemComponent,
    PurchaseFailedComponent,
    UpdatePaymentFormComponent,
    CartNavComponent,
    OrderComponent,
    PurchaseHistoryComponent,
    CustomerAccountNavComponent,
    LoginNavComponent,
    OrderDetailComponent,
    OrderItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [HttpClient, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
