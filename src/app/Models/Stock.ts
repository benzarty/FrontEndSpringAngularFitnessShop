import { Produit } from './Produit';
export class Stock {

  idStock !: number;
    qte !: number;
    qteMin !: number;
    libelleStock !: string;
    dateCreation!:Date;
    dateDerniereModification!:Date;

    stockproduittt !: Produit[];


    constructor(qte:number, qteMin:number,libelle:string) {
      this.qte = qte;
      this.qteMin = qteMin;
      this.libelleStock= libelle;
    }
  
  }
  