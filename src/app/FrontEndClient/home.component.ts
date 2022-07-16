import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userFile;
  imgURL: any;
  public imagePath;
  formuser: FormGroup;
  public message: string;
  ob:Subscription;




  constructor(public userService: UserService, private userauthService: AuthService, private route: Router,private toastr: ToastrService,private formbuider: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.init();
  }


  init() {
    this.formuser = this.formbuider.group({
      userFirstName: ['', [Validators.required]],
      userName: ['', [Validators.required]],

      userLastName: ['', [Validators.required]],

      userPassword: ['', [Validators.required]],

      
      phone: ['', [Validators.required]],
      fileName: ['', [Validators.required]],

      email: ['', [Validators.required]],
    });

  }

  












  login(loginform: NgForm) {
    this.userService.login(loginform.value).subscribe(
      {
        next: (value: any) => {
          this.userauthService.setRoles(value.user.role);
          this.userauthService.setToken(value.jwtToken);

      

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





  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }


  NewUser()
  { 

    const formData = new FormData();

    const user = this.formuser.value;



    this.formuser.reset();


    console.log(user);
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile);
    this.ob=this.userService.createData2(formData).subscribe(data => {

      

      let ref = document.getElementById('cancel2');
      ref.click();
      this.toastr.success('Notification', 'Succesfully Registered');

    });


  }
  
}
