import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProductCardListComponent } from './components/Product/product-card-list/product-card-list.component';
import { ProductDetailComponent } from './components/Product/product-detail/product-detail.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AdminDashboardComponent } from './components/dashboard/admin/admin-dashboard/admin-dashboard.component';
import { AccountComponent } from './components/dashboard/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductCardListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  {
    path: 'user',
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'account', component: AccountComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
