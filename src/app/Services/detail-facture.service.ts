import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailFacture } from '../Models/DetailFacture';

@Injectable({
  providedIn: 'root'
})
export class DetailFactureService {

  constructor(private myhttp:HttpClient) { }



  getDetailFacture(detailproduit: string) : Observable<DetailFacture[]>{
    return this.myhttp.get<DetailFacture[]>(environment.URL+"/DetailFacture/retrieveDetailFactureBYidfacture/" +detailproduit);
  }

  
  addDetailFacture (detailfacture: DetailFacture,idProduit:number,idclient:string): Observable<DetailFacture> {
    return this.myhttp.post<DetailFacture>(environment.URL+"/DetailFacture/add-DetailFacture2/"+idProduit+"/"+idclient, detailfacture);}
}
