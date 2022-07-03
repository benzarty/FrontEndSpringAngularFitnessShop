import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { LayoutComponent } from '../dashboard/layout/layout.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [

  { path: '', component: LayoutComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'Client', component: ClientComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
