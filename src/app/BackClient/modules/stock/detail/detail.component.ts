import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produit } from 'src/app/Models/Produit';
import { Stock } from 'src/app/Models/Stock';
import { ProduitService } from 'src/app/Services/produit.service';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,public productservice: ProduitService) { }
  ob:Subscription;
  produitonly:Produit[];

  id:any

  ngOnInit(): void {

    this.id=this._Activatedroute.snapshot.paramMap.get("id");

this.getProduitByIDStock(this.id);

  }


  getProduitByIDStock(id){
    this.ob=this.productservice.getProduitByIDStock(id).subscribe(res => {
      this.produitonly = res;

      console.log( this.produitonly);
      // this.produitonly= Object.keys(this.listestock.stockproduittt)
      
    });
  }



}
