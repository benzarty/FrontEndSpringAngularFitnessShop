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



  getReviews1() : Observable<Number>{
    return this.myhttp.get<Number>(environment.URL+"/Reviews/retrievenumbers1");
  }
  getReviews2() : Observable<Number>{
    return this.myhttp.get<Number>(environment.URL+"/Reviews/retrievenumbers2");
  }
  getReviews3() : Observable<Number>{
    return this.myhttp.get<Number>(environment.URL+"/Reviews/retrievenumbers3");
  }
  getReviews4() : Observable<Number>{
    return this.myhttp.get<Number>(environment.URL+"/Reviews/retrievenumbers4");
  }
  getReviews5() : Observable<Number>{
    return this.myhttp.get<Number>(environment.URL+"/Reviews/retrievenumbers5");
  }


}
