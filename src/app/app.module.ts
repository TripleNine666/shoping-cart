import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./in-memory-data.service";

import { ShopComponent } from './components/pages/shop/shop.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { HeaderDetailsComponent } from './components/UI/header-details/header-details.component';
import { MenuComponent } from './components/UI/menu/menu.component';
import { CounterComponent } from './components/counter/counter.component';
import { PricePanelComponent } from './components/price-panel/price-panel.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { HeaderCartComponent } from './components/UI/header-cart/header-cart.component';
import { ArrowBackComponent } from './components/UI/arrow-back/arrow-back.component';
import { CartItemComponent } from './components/pages/shopping-cart/cart-item/cart-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/pages/login/login.component';

import { AuthService } from "./services/auth.service";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";

import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { OrderHistoryComponent } from './components/pages/order-history/order-history.component';
import { OrderDetailsComponent } from './components/pages/order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HeaderComponent,
    DetailsComponent,
    HeaderDetailsComponent,
    MenuComponent,
    CounterComponent,
    PricePanelComponent,
    ShoppingCartComponent,
    HeaderCartComponent,
    ArrowBackComponent,
    CartItemComponent,
    LoginComponent,
    OrderHistoryComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false
    }),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    RippleModule,
    ReactiveFormsModule,
    MessageModule,
    NgxIntlTelInputModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
