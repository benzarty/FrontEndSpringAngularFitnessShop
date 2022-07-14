import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentIntentDto } from '../Models/PaymentIntentDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripeURL = 'http://localhost:8080/stripe/';

  constructor(private httpClient: HttpClient) {}

  public pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.httpClient.post<string>(environment.URL + '/stripe/paymentintent', paymentIntentDto);
  }

  public confirmar(id: string) {
    return this.httpClient.post(environment.URL + '/stripe/confirm/'+id,{});
  }

  public cancelar(id: string){
    return this.httpClient.post(environment.URL + '/stripe/cancel/'+id,{});
  }

}