import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facture } from '../Models/Facture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private myhttp:HttpClient) { }


  getFactureByClient(idclient:string) : Observable<Facture>{
    return this.myhttp.get<Facture>(environment.URL +"/facture/getFacturesByClient/"+idclient);
  }



}
