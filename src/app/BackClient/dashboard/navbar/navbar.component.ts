import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MessagesService } from 'src/app/Services/messages.service';
import { UserService } from 'src/app/Services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { Messages } from 'src/app/Models/Messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token: any;
  ob: Subscription;
  usertab: User;
  messagetab: Messages[];
  i: number = 0;
  constructor(
    private message: MessagesService,
    private auth: AuthService,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.getAllMailAdmin();
  }

  getAllMailAdmin() {
    this.token = this.auth.getToken();

    const decoded = this.getDecodedAccessToken(this.token);

    const username = decoded.sub;

    this.ob = this.us.GetUserByid(username).subscribe((res) => {
      this.usertab = res;

      this.message.getMessages(this.usertab).subscribe((res) => {
        this.messagetab = res;

        for (let i = 0; i < this.messagetab.length; i++) {
         
          if(this.messagetab[i].readed === true) {

          this.i++;
       
        }

        
      
      }

      });
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
