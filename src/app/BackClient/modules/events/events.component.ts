import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/Services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, OnDestroy {
  ob: Subscription;
  listEvent: any;

  constructor(
    private EventServices: EventsService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  calendarOptions: CalendarOptions;

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.EventServices.getAllEvent().subscribe((res) => {
      this.listEvent = res;

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        weekends: true,
        events: this.listEvent,
      };
    });
  }

  postevent(f: NgForm) {
    this.EventServices.PostEvent(f.value).subscribe((res) => {
      f.reset();

      let ref = document.getElementById('close');
      ref?.click();
      this.toastr.success('Notification', 'Succesfully Added');

      this.getAllEvents();
    });
  }
}
