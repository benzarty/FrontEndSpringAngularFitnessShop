import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Facture } from 'src/app/Models/Facture';
import { AuthService } from 'src/app/Services/auth.service';
import { FactureService } from 'src/app/Services/facture.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/User';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  paymentHandler: any = null;
  showpay:boolean = false;

  token: any;
  FactureClient: Facture;
  FactureClientHistorique: Facture[];

  User: User;
  @ViewChild('demo',{static:false}) el!: ElementRef;


  constructor(private auth: AuthService, private us: FactureService, private userservice: UserService) { }

  ngOnInit(): void {
    this.getFactureByClient();



    this.getFacturesHistorique();
  }


  getFactureByClient() {

    this.token = this.auth.getToken()

    const decoded = this.getDecodedAccessToken(this.token);

    const username = decoded.sub;





    this.us.getFactureByClient(username).subscribe(res => {
      this.FactureClient = res;


console.log( this.FactureClient);

    });

    this.userservice.GetUserByid(username).subscribe(res => {
      this.User = res;


    });


  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  makePDF()
{
  let pdf=new  jsPDF('p','pt','a1');
  pdf.html(this.el.nativeElement,{callback:(pdf)=>{pdf.save("Facture.pdf");
  }})
  
}

getFacturesHistorique() {

  this.token = this.auth.getToken()

  const decoded = this.getDecodedAccessToken(this.token);

  const username = decoded.sub;

  this.us.getFacturesHistorique(username).subscribe(res => {
    this.FactureClientHistorique = res;


  });
}

ShowPay()
{ 
  if (this.showpay==false)
  
  this.showpay=true;
   
  else this.showpay=false;

  console.log(this.showpay);
  
}






  
}
