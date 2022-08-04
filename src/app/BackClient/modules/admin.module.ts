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
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventsComponent } from './events/events.component';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CoursesComponent } from './courses/courses.component';
import { MessagesComponent } from './messages/messages.component'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    LayoutComponent,
    ClientComponent,
    ProduitComponent,
    StockComponent,
    DetailComponent,
    EventsComponent,
    CoursesComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FullCalendarModule,
     // required animations module
      ]
})
export class AdminModule { }
