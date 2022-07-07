import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from '../dashboard/layout/layout.component';
import { ClientComponent } from './client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProduitComponent } from './produit/produit.component';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StockComponent } from './stock/stock.component';
import { DetailComponent } from './stock/detail/detail.component';



@NgModule({
  declarations: [
    LayoutComponent,
    ClientComponent,
    ProduitComponent,
    StockComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
     // required animations module
      ]
})
export class AdminModule { }
