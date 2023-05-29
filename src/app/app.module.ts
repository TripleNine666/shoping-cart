import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./in-memory-data.service";

import { ShopComponent } from './components/pages/shop/shop.component';
import { HeaderComponent } from './components/UI/header/header.component';
import {RippleModule} from "primeng/ripple";
import { DetailsComponent } from './components/pages/details/details.component';
import { HeaderDetailsComponent } from './components/UI/header-details/header-details.component';
import { MenuComponent } from './components/UI/menu/menu.component';
import { CounterComponent } from './components/counter/counter.component';
import { PricePanelComponent } from './components/price-panel/price-panel.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { HeaderCartComponent } from './components/UI/header-cart/header-cart.component';
import { ArrowBackComponent } from './components/UI/arrow-back/arrow-back.component';
import { CartItemComponent } from './components/pages/shopping-cart/cart-item/cart-item.component';
import {FormsModule} from "@angular/forms";


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
    CartItemComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PrimengModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true
        }),
        RippleModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
