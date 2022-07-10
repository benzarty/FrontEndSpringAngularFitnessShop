import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/Models/Facture';
import { AuthService } from 'src/app/Services/auth.service';
import { FactureService } from 'src/app/Services/facture.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  token:any;
  FactureClient: Facture;

  constructor(private auth: AuthService,private us:FactureService) { }

  ngOnInit(): void {
    this.getFactureByClient();
  }

 
  getFactureByClient() {

    this.token=this.auth.getToken()
  
    const decoded = this.getDecodedAccessToken(this.token); 
    
    const username = decoded.sub; 


    this.us.getFactureByClient(username).subscribe(res => {
      this.FactureClient = res;

    });
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
