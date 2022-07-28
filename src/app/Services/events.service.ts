import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../Models/Events';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private myhttp: HttpClient) {}

  getAllEvent(): Observable<Events[]> {
    return this.myhttp.get<Events[]>(
      environment.URL + '/Event/retrieve-all-Event'
    );
  }

  PostEvent(eve: Event): Observable<any> {
    return this.myhttp.post(`${environment.URL + '/Event/add-Event/'}`, eve);
  }

  retrieveEventsbydate(datee:string): Observable<Events> {
    return this.myhttp.get<Events>(environment.URL + '/Event/retrieveEventsbydate/'+datee);}



    
  
}
