import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offers } from '../Models/Offers';

@Injectable({
  providedIn: 'root',
})
export class OffresService {
  constructor(private myhttp: HttpClient) {}

  public OffreUrl:string='http://localhost:9090/Offres'


  getAllOffers(): Observable<Offers[]> {
    return this.myhttp.get<Offers[]>(
      environment.URL + '/Offres/retrieve-all-Offers'
    );
  }

  PostOffer(eve: Offers): Observable<any> {
    return this.myhttp.post(`${environment.URL + '/Offres/add-Offers/'}`, eve);
  }

  public GetOffersByid(offersId: string): Observable<Offers> {
    return this.myhttp.get<Offers>(
      environment.URL + '/Offres/retrieve-Offers/' + offersId
    );
  }

  deleteOffersById(id: number): Observable<any> {
    return this.myhttp.delete<any>(
      environment.URL + '/Offres/remove-Offers/' + id
    );
  }



  createData(formData: FormData): Observable<any> {
    return this.myhttp.post(`${environment.URL+"/Offres/file"}`, formData);
  }
}
