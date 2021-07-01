import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProductCardListComponent } from './components/Product/product-card-list/product-card-list.component';
import { ProductDetailComponent } from './components/Product/product-detail/product-detail.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AccountComponent } from './components/dashboard/account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { AddImagesComponent } from './components/dashboard/admin/add-images/add-images.component';
import { OrderPlaceComponent } from './components/cart/order-place/order-place.component';
import { OrderDetailComponent } from './components/dashboard/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: ProductCardListComponent },
  { path: 'products', component: ProductCardListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  {
    path: 'user',
    children: [
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'orderDetail/:id/:customerId', component: OrderDetailComponent, canActivate: [AuthGuard] },
      { path: 'addImages/:id', component: AddImagesComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'success', component: OrderPlaceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
