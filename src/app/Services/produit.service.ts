import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produit } from '../Models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  public productsUrl:string='http://localhost:9090/Produit'

    requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(private myhttp:HttpClient) { }


   
  getAllProduits() : Observable<Produit[]>{
    return this.myhttp.get<Produit[]>(environment.URL+"/Produit/retrieve-all-produits", {
      headers: this.requestHeader,
    });
  }


  
  getbyid(idProduit :number) {
    return this.myhttp.get<Produit>(environment.URL+'/Produit/retrieve-produit/' + idProduit);
  }

  deleteProduct (product: number ): Observable<Produit> {
    const url=environment.URL+"/Produit/remove-produit/"+ product;
    return this.myhttp.delete<Produit>(url);
  }

  


  createData(formData: FormData,idStock:number): Observable<any> {
    return this.myhttp.post(`${environment.URL+"/Produit/file/"+idStock}`, formData);
  }

  getProduitByIDStock(idStock :number): Observable<Produit[]>{ 
    return this.myhttp.get<Produit[]>( this.productsUrl+'/retrieveproduitbyidstock/' + idStock);
  }
  


}
