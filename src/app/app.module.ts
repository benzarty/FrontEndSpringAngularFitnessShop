import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './BackClient/dashboard/dashboard.component';
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
import { AdminModule } from './BackClient/modules/admin.module';
import { EndComponent } from './BackClient/dashboard/end/end.component';
import { HomeComponent } from './FrontEndClient/home.component';
import { FooterComponent } from './FrontEndClient/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    
    
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AdminModule,
    BrowserAnimationsModule,  //yetketbou ken houni héthom
    ToastrModule.forRoot(),  //yetketbou ken houni héthom
  ],
  providers: [AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},UserService], 
  //provide http interceptor fil class authinterceptor w nesta3melouh fil userservice
  bootstrap: [AppComponent]
})
export class AppModule { }
