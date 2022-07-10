import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetailFacture } from 'src/app/Models/DetailFacture';
import { Produit } from 'src/app/Models/Produit';
import { AuthService } from 'src/app/Services/auth.service';
import { ProduitService } from 'src/app/Services/produit.service';
import jwt_decode from 'jwt-decode';
import { DetailFactureService } from 'src/app/Services/detail-facture.service';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{
  listeproduit: Produit[];



  searchtext:any

  qte:number=0;
  prixUnitaire:number;
  total:number;
  ob: Subscription;
  formproduit: FormGroup;
  idproduit:number;
  token:any;
  decoded:any;
  minValue: number = 0;
  maxValue: number = 200;

  options: Options = {
    floor: 0,
    ceil: 250
  };



  constructor(private userauthService:AuthService,private toastr: ToastrService,public produitservice: ProduitService,private formbuider: FormBuilder,public DetailFacture:DetailFactureService) { }
  ngOnDestroy(): void {
    this.ob.unsubscribe();


  }

  ngOnInit(): void {
    this.getAllProducts();
    this.infoForm();


  }


  infoForm() {
    this.formproduit = this.formbuider.group({
      idProduit: ['', [Validators.required]],

      libelle: ['', [Validators.required]],
      code: ['', [Validators.required]],
      prixUnitaire: ['', [Validators.required]],
      stockproduit: ['', [Validators.required]],
      fileName: ['', [Validators.required]],
      qte: ['', [Validators.required]],

      

      
    });


  }







  public isLoggedIn() {
    return this.userauthService.isLoggedIn();
  }

  public logout() { this.userauthService.clear(); }

  getAllProducts() {
    this.ob=this.produitservice.getAllProduits().subscribe(res => {
      this.listeproduit = res;
    });
  }

  minus()
  { 
    if( this.qte>0)
    this.qte--;

    this.total=this.qte*this.prixUnitaire


  }

  Plus()
  { 
   this.qte++;
   this.total=this.qte*this.prixUnitaire


  }

  SetDetails(row: Produit) {


    this.formproduit.controls['idProduit'].setValue(row.idProduit);
    this.formproduit.controls['code'].setValue(row.code);

    this.formproduit.controls['libelle'].setValue(row.libelle);

    this.formproduit.controls['prixUnitaire'].setValue(row.prixUnitaire);
    
    this.formproduit.controls['qte'].setValue(this.qte);

    this.prixUnitaire=row.prixUnitaire;

  

  }


  AddToCard() {
    let myi=new DetailFacture();


    this.idproduit=this.formproduit.get('idProduit').value;

    myi.qte=this.qte;
this.token=this.userauthService.getToken()
  
const decoded = this.getDecodedAccessToken(this.token); 

const username = decoded.sub; 



    this.ob=this.DetailFacture.addDetailFacture(myi,this.idproduit,username).subscribe(
      {
        next: (value: any) => {


          let ref = document.getElementById('cancel');
          ref?.click();

          this.toastr.success('Notification', 'Succesfully Added to Card');

        },
        error: err => console.error(err),
        complete: () => console.log('DONE!')
      }
    )


  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  filterMin()
  { 
   

    this.ob=this.produitservice.getAllProduits().subscribe(res => {
      this.listeproduit = res;

      this.listeproduit=this.listeproduit.filter(prod =>{

        return prod.prixUnitaire > this.minValue && prod.prixUnitaire < this.maxValue;
        
     })



    });



  }





}
