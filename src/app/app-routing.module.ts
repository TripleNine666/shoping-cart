import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from "./components/shop/shop.component";
import { DetailsComponent } from "./components/details/details.component";

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: ShopComponent },
  { path: 'detail/:id', component: DetailsComponent },
  { path: 'login', component: ShopComponent },
  { path: 'history', component: ShopComponent },
  { path: 'contacts', component: ShopComponent },
  { path: 'profile', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
