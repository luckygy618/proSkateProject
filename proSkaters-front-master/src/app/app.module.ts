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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './form-error/form-error.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountNavigationComponent } from './account-navigation/account-navigation.component';
import { FormSuccessComponent } from './form-success/form-success.component';
import { AlertComponent } from './alert/alert.component';
import { LoginPageComponent } from './login-page/login-page.component';


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
    ReplaceLineBreaks,
    ProductListComponent,
    ProductAddComponent,
    FormErrorComponent,
    RegisterComponent,
    LoginComponent,
    AccountNavigationComponent,
    FormSuccessComponent,
    AlertComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [
    HttpClient,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
