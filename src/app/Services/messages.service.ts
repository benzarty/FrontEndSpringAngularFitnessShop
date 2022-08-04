import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Messages } from '../Models/Messages';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private myhttp: HttpClient) {}

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  PostMessage(eve: Messages, mail: String): Observable<any> {
    return this.myhttp.post(
      `${environment.URL + '/Message/addMessageAdmin/' + mail}`,
      eve,
      {
        headers: this.requestHeader,
      }
    );
  }

  sendtoUsers(eve: Messages, mail: String): Observable<any> {
    return this.myhttp.post(
      `${environment.URL + '/Message/sendMessagetoUsers/' + mail}`,
      eve
    );
  }


  sendtoUsers2(eve: Messages): Observable<any> {
    return this.myhttp.post(
      `${environment.URL + '/Message/sendMessagetoUsers2'}`,
      eve
    );
  }

  readMail(id: Number): Observable<any> {
    return this.myhttp.post(
      `${environment.URL + '/Message/reded/'+id}`,{})
  }


  

  getMessages(us: User): Observable<Messages[]> {
    return this.myhttp.get<Messages[]>(
      environment.URL + '/Message/retrieveallMessagesbyuser/' + us.email
    );
  }

  deleteMessage(message: number): Observable<Messages> {
    const url = environment.URL + '/Message/removeMessage/' + message;
    return this.myhttp.delete<Messages>(url);
  }
}
