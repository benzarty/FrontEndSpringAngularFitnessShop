import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './BackClient/dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { UserService } from './Services/user.service';
import { LayoutComponent } from './Backclient/dashboard/layout/layout.component';
import { NavbarComponent } from './BackClient/dashboard/navbar/navbar.component';
import { SidbarComponent } from './BackClient/dashboard/sidbar/sidbar.component';
import { AdminModule } from './BackClient/modules/admin.module';
import { EndComponent } from './BackClient/dashboard/end/end.component';
import { HomeComponent } from './FrontEndClient/home.component';
import { FooterComponent } from './FrontEndClient/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './FrontEndClient/modules/products/products.component';
import { NavBarComponent } from './FrontEndClient/Navbarfront/nav-bar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CardComponent } from './FrontEndClient/modules/card/card.component';
import { CardDetailsComponent } from './FrontEndClient/modules/card-details/card-details.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './FrontEndClient/modules/payment/payment.component';
import { ProfilComponent } from './FrontEndClient/modules/profil/profil.component';
import { DetailProductComponent } from './FrontEndClient/modules/detail-product/detail-product.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { EventComponent } from './FrontEndClient/modules/event/event.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
    ForbiddenComponent,
    NavbarComponent,
    SidbarComponent,
    EndComponent,
    ProductsComponent,
    NavBarComponent,
    CardComponent,
    CardDetailsComponent,
    PaymentComponent,
    ProfilComponent,
    DetailProductComponent,
    EventComponent,

    
    
      ],
  imports: [
    NgxSliderModule,
    NgxPrintModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxStarRatingModule,
    AdminModule,
    Ng2SearchPipeModule,
    NgxStripeModule.forRoot('pk_test_51LKbfQH5PKYWkTUnQsjOXMbRrZalA3TpxvKyvBnIEuyGZDhMrb47Zn8269SluMeWNkT5lJQuHboCzHk20yXWgZZD00ru3vmOuV'),
BrowserAnimationsModule,  //yetketbou ken houni héthom
    ToastrModule.forRoot()  //yetketbou ken houni héthom
  ],
  providers: [AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},UserService], 
  //provide http interceptor fil class authinterceptor w nesta3melouh fil userservice
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
