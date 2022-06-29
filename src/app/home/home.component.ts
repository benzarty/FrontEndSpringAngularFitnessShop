import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService, private userauthService: AuthService, private route: Router) { }

  ngOnInit(): void {
    //this.forUser();
  }

  login(loginform: any) {
    this.userService.login(loginform.value).subscribe(
      {
        next: (value: any) => {
          this.userauthService.setRoles(value.user.role);
          this.userauthService.setToken(value.jwtToken);

          const role = value.user.role[0].roleName;
          window.location.reload();




        },
        error: err => console.error(err),
        complete: () => console.log('DONE!')
      }
    )


  }
  public isLoggedIn() {
    return this.userauthService.isLoggedIn();
  }
  public isAdmin() {
    return this.userauthService.isLoggedIn();
  }
  public logout() { this.userauthService.clear(); }


  forUser() {
    this.userService.forAdmin().subscribe(
      (response) => {
        console.log(response);
      
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

}
