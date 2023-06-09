import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./in-memory-data.service";

import { ShopComponent } from './components/pages/shop/shop.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { MenuComponent } from './components/UI/menu/menu.component';
import { CounterComponent } from './components/counter/counter.component';
import { PricePanelComponent } from './components/price-panel/price-panel.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import { appInitializerFactory } from './app.initializer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RemoveCartComponent } from './components/UI/remove-cart/remove-cart.component';
import { LayoutComponent } from './components/UI/layout/layout.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HeaderComponent,
    DetailsComponent,
    MenuComponent,
    CounterComponent,
    PricePanelComponent,
    ShoppingCartComponent,
    ArrowBackComponent,
    CartItemComponent,
    LoginComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    LoginFormComponent,
    ProfileComponent,
    ContactsComponent,
    RemoveCartComponent,
    LayoutComponent
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
    NgxIntlTelInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      // production false
      enabled: false,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true
    },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
