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


  getFacturesHistorique(idclient:string) : Observable<Facture[]>{
    return this.myhttp.get<Facture[]>(environment.URL +"/facture/getFacturesHistorique/"+idclient);
  }



  Closefacture (v: number): Observable<Facture> {
    return this.myhttp.put<Facture>(environment.URL+"/facture/closefacture/"+v,null);
    }



    getNbFactureLastMonth() : Observable<number>{
      return this.myhttp.get<number>(environment.URL+"/facture/getNbFactureLastMonth");
    }
  
    getChiffreaffaireLastMonth() : Observable<number>{
      return this.myhttp.get<number>(environment.URL+"/facture/getChiffreaffaireLastMonth");
    }
  
    getChiffreaffairetoday() : Observable<number>{
      return this.myhttp.get<number>(environment.URL+"/facture/getChiffreaffairetoday");
    }
    


}
