import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from "./components/pages/shop/shop.component";
import { DetailsComponent } from "./components/pages/details/details.component";
import { ShoppingCartComponent} from "./components/pages/shopping-cart/shopping-cart.component";
import { LoginComponent } from "./components/pages/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'detail/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: ShopComponent },
  { path: 'contacts', component: ShopComponent },
  { path: 'profile', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
