import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService, private userauthService: AuthService, private route: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.forUser();
  }

  login(loginform: NgForm) {
    this.userService.login(loginform.value).subscribe(
      {
        next: (value: any) => {
          this.userauthService.setRoles(value.user.role);
          this.userauthService.setToken(value.jwtToken);

          //const role = value.user.role[0].roleName;
         // window.location.reload();
       // console.log(value);

       let ref = document.getElementById('cancel');
       ref?.click();
       this.toastr.success('Notification', 'Succesfully Login');




        },
        error: err => {
          console.error(err);
        
          this.toastr.error('Notification', 'Error Connextion');

        
        
        },
        complete: () => console.log('DONE!')
      }
    )


  }


  Register(loginform: NgForm) {
    console.log(loginform.value);
    this.userService.Register(loginform.value).subscribe(
      {
        next: (value: any) => {
         

          let ref = document.getElementById('cancel2');
          ref.click();
          this.toastr.success('Notification', 'Succesfully Registered');



        },
        error: err => {console.error(err);
        
          this.toastr.error('Notification', 'Something Wrong happened');

        
        },
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



}
