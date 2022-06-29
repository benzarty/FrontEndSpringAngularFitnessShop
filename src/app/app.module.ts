import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './BackClient/dashboard/dashboard.component';
import { FooterComponent } from './home/footer/footer.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { UserService } from './Services/user.service';
import { LayoutComponent } from './Backclient/dashboard/layout/layout.component';
import { NavbarComponent } from './BackClient/dashboard/navbar/navbar.component';
import { SidbarComponent } from './BackClient/dashboard/sidbar/sidbar.component';
import { Footer2Component } from './Backclient/dashboard/footer2/footer2.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent,
    ForbiddenComponent,
    LayoutComponent,
    NavbarComponent,
    SidbarComponent,
    Footer2Component  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},UserService], 
  //provide http interceptor fil class authinterceptor w nesta3melouh fil userservice
  bootstrap: [AppComponent]
})
export class AppModule { }
