import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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

  formEvent: FormGroup;

  formEvent2: FormGroup;


  constructor(
    private EventServices: EventsService,
    private toastr: ToastrService,private formbuider: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  calendarOptions: CalendarOptions;

  ngOnInit(): void {
    this.getAllEvents();
    this.infoForm();
    this.detailEvent();

  }



  infoForm() {
    this.formEvent = this.formbuider.group({
      title: ['', [Validators.required]],

      date: ['', [Validators.required]],
      host: ['', [Validators.required]],
      description: ['', [Validators.required]],

      
    });
  }
  
  detailEvent() {
    this.formEvent2 = this.formbuider.group({
      title2: ['', [Validators.required]],

      date2: ['', [Validators.required]],
      host2: ['', [Validators.required]],
      description2: ['', [Validators.required]],

      
    });
  }

  getAllEvents() {
    this.EventServices.getAllEvent().subscribe((res) => {
      this.listEvent = res;

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        weekends: true,
        events: this.listEvent,
        dateClick: this.handleDateClick.bind(this), // bind is important!
      };
    });
  }

  addEvent() {

    const event = this.formEvent.value;

    this.EventServices.PostEvent(event).subscribe((res) => {
      if (res == false) {
        this.toastr.warning(
          'Notification',
          'Already event in this date,Please choose another date'
        );
      } else {
        this.formEvent.reset();

        let ref = document.getElementById('close');
        ref?.click();
        this.toastr.success('Notification', 'Succesfully Added');

        this.getAllEvents();
      }
    });
  }

  handleDateClick(arg) {
    
console.log(arg.dateStr);
    let ref = document.getElementById('openn');
    ref?.click();

    this.EventServices.retrieveEventsbydate(arg.dateStr).subscribe((res) => {

      this.formEvent2.controls['title2'].setValue(res.title);
      this.formEvent2.controls['date2'].setValue(res.date);
  
      this.formEvent2.controls['host2'].setValue(res.host);

      this.formEvent2.controls['description2'].setValue(res.description);


});
}
}