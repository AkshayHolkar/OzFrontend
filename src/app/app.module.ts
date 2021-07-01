import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCardComponent } from './components/Product/product-card/product-card.component';
import { ProductCardListComponent } from './components/Product/product-card-list/product-card-list.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CartCardComponent } from './components/cart/cart-card/cart-card.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/Product/product-detail/product-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './components/dashboard/account/account.component';
import { OrderComponent } from './components/dashboard/order/order.component';
import { OrderDetailComponent } from './components/dashboard/order-detail/order-detail.component';
import { AddProductComponent } from './components/dashboard/admin/add-product/add-product.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddImagesComponent } from './components/dashboard/admin/add-images/add-images.component';
import { OrderPlaceComponent } from './components/cart/order-place/order-place.component';
import { EditProductsComponent } from './components/dashboard/admin/edit-products/edit-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductCardComponent,
    ProductCardListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CartCardComponent,
    CartComponent,
    ProductDetailComponent,
    DashboardComponent,
    AccountComponent,
    OrderComponent,
    OrderDetailComponent,
    AddProductComponent,
    AddImagesComponent,
    OrderPlaceComponent,
    EditProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModule,
    BrowserAnimationsModule,
    NgbModule,
    ColorPickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
