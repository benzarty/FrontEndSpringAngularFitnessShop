import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../Models/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private myhttp:HttpClient) { }



 

  getAllStock(): Observable<Stock[]> {
    return this.myhttp.get<Stock[]>(environment.URL+"/Stock/retrieve-all-Stock")
  }


  public addStock(stock:Stock) : Observable<Stock>{
    return this.myhttp.post<Stock>(environment.URL + '/Stock/add-Stock',stock, {
      responseType: 'json',
    });
  }

  
  deleteStock(stockid: number): Observable<any> {
    return this.myhttp.delete<any>(environment.URL +'/Stock/remove-Stock/'+stockid);

  }

}
