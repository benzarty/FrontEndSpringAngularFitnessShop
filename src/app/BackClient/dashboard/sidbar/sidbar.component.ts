import  jwt_decode  from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css'],
})
export class SidbarComponent implements OnInit {

  usertab: User;
  ob: Subscription;
  token: any;


  constructor(
    private userauthService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  public logout() {

    this.userauthService.clear();
  }

  getUser() {
    this.token = this.userauthService.getToken();

    const decoded = this.getDecodedAccessToken(this.token);

    const username = decoded.sub;

    this.ob = this.userService.GetUserByid(username).subscribe((res) => {
      this.usertab = res;

    })


  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


}
