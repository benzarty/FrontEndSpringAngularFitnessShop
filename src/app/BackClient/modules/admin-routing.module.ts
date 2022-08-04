import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { ForbiddenComponent } from 'src/app/forbidden/forbidden.component';
import { LayoutComponent } from '../dashboard/layout/layout.component';
import { ClientComponent } from './client/client.component';
import { CoursesComponent } from './courses/courses.component';
import { EventsComponent } from './events/events.component';
import { MessagesComponent } from './messages/messages.component';
import { ProduitComponent } from './produit/produit.component';
import { DetailComponent } from './stock/detail/detail.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'Evvvvent',
    component: EventsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  {
    path: 'Client',
    component: ClientComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'Produit',
    component: ProduitComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'Stock',
    component: StockComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'StockDetails/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'MessagesBack',
    component: MessagesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
 
  {
    path: 'coursesBackground',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  {
    path: '**',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
