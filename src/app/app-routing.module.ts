import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { DashboardComponent } from './BackClient/dashboard/dashboard.component';
import { LayoutComponent } from './Backclient/dashboard/layout/layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './FrontEndClient/home.component';
import { CardDetailsComponent } from './FrontEndClient/modules/card-details/card-details.component';
import { CardComponent } from './FrontEndClient/modules/card/card.component';
import { ProductsComponent } from './FrontEndClient/modules/products/products.component';
import { ProfilComponent } from './FrontEndClient/modules/profil/profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'Home', component: HomeComponent, pathMatch: 'full' },
  { path: 'Products', component: ProductsComponent, canActivate:[AuthGuard],data:{roles:['Admin']} },
  { path: 'Card', component: CardComponent, canActivate:[AuthGuard],data:{roles:['Admin']} },
  { path: 'CardDetails/:id', component: CardDetailsComponent, canActivate:[AuthGuard],data:{roles:['Admin']} },
  { path: 'Profil', component: ProfilComponent, canActivate:[AuthGuard],data:{roles:['Admin']} },


  


  {
    path: 'DashBoard',
    component: DashboardComponent,
    children: [
    //  { path: '', component: LayoutComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }]
    {
      path: '', loadChildren:
        () => import('./BackClient/modules/admin.module').then(m => m.AdminModule)
    } ]
  },

  { path: 'forbidden', component: ForbiddenComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
