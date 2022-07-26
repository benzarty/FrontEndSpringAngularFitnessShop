import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/Services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  searchtext:any

  listEvent: any;


  constructor(
    private EventServices: EventsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this. getAllEvents();
  }



  getAllEvents() {
    this.EventServices.getAllEvent().subscribe((res) => {
      this.listEvent = res;

   
      
    });
  }

}
