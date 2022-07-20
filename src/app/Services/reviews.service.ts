import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reviews } from '../Models/Reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private myhttp:HttpClient) { }



  getReviews(idprod:number) : Observable<Reviews[]>{
    return this.myhttp.get<Reviews[]>(environment.URL+"/Reviews/retrieve-getReviews/"+idprod);
  }

  PostReview(rev: Reviews,idpro:number): Observable<any> {
    return this.myhttp.post(`${environment.URL+"/Reviews/addReview/"+idpro}`, rev);
  }


}
