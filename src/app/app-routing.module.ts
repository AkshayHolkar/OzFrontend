import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProductCardListComponent } from './components/Product/product-card-list/product-card-list.component';
import { ProductDetailComponent } from './components/Product/product-detail/product-detail.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AdminAccountComponent } from './components/account/admin/admin-account/admin-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductCardListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'account', component: AccountComponent },
  { path: 'admin', component: AdminAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
