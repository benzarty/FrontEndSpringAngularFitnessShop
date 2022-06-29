import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { DashboardComponent } from './BackClient/dashboard/dashboard.component';
import { LayoutComponent } from './Backclient/dashboard/layout/layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'Home', component: HomeComponent, pathMatch: 'full' },
  //{ path: 'DashBoard', component: DashboardComponent,canActivate:[AuthGuard],data:{roles:['Admin']} },
  {
    path: 'DashBoard',
    component: DashboardComponent,
    children: [
      { path: '', component: LayoutComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }]
  },

  { path: 'forbidden', component: ForbiddenComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
