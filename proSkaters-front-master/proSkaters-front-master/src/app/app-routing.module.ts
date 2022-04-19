import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomerAccountInfoComponent } from './customer-account-info/customer-account-info.component';
import { CustomerAccountSettingsComponent } from './customer-account-settings/customer-account-settings.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePaymentInfoComponent } from './update-payment-info/update-payment-info.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account/register', component: RegisterPageComponent },
  { path: 'account/login', component: LoginPageComponent },
  { path: 'account', component: CustomerAccountInfoComponent },
  { path: 'account/settings', component: CustomerAccountSettingsComponent },
  { path: 'account/settings/password', component: UpdatePasswordComponent },
  { path: 'account/settings/payment', component: UpdatePaymentInfoComponent },
  { path: 'account/history', component: PurchaseHistoryComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'product-add', component: ProductAddComponent },
  { path: 'cart', component: ViewCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order/confirmation', component: OrderConfirmationComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
