import { Produit } from "./Produit";

export class DetailFacture {

	iddetailFacture?:number;
	  qte?:number;
	  prixtotal?:number;
	  pourcentageRemise?:number;
	  montantRemise?:number;
	  idfacture?:number;
	  totheparentdetailfacture:Produit

}