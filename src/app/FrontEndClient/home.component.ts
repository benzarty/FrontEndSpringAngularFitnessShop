import jwt_decode  from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../Models/User';
import { AuthService } from '../Services/auth.service';
import { MessagesService } from '../Services/messages.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userFile;
  imgURL: any;
  public imagePath;
  formuser: FormGroup;
  usertab: User;

  formMessage: FormGroup;
  public message: string;
  ob: Subscription;
  result: number = 0;
  comment: string;
  token: any;
  uss: User;

  constructor(
    public userService: UserService,
    private userauthService: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private formbuider: FormBuilder,
    private messageservice:MessagesService,
  
    
  ) {}

  ngOnInit(): void {
    this.init();

    this.initMessage();

    
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

  initMessage() {
    this.formMessage = this.formbuider.group({
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  login(loginform: NgForm) {
    this.userService.login(loginform.value).subscribe({
      next: (value: any) => {
        this.userauthService.setRoles(value.user.role);
        this.userauthService.setToken(value.jwtToken);

        let ref = document.getElementById('cancel');
        ref?.click();
        this.toastr.success('Notification', 'Succesfully Login');

        this.getUser();
      },
      error: (err) => {
        console.error(err);

        this.toastr.error('Notification', 'Error Connextion');
      },
      complete: () => console.log('DONE!'),
    });
  }

  public isLoggedIn() {
    return this.userauthService.isLoggedIn();
  }
  public isAdmin() {
    return this.userauthService.isLoggedIn();
  }
  public logout() {
    this.userauthService.clear();
  }

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

  NewUser() {
    const formData = new FormData();

    const user = this.formuser.value;

    this.formuser.reset();

    console.log(user);
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile);
    this.ob = this.userService.createData2(formData).subscribe((data) => {
      let ref = document.getElementById('cancel2');
      ref.click();
      this.toastr.success('Notification', 'Succesfully Registered');
    });
  }

  PasswordReset(b: NgForm) {
    this.uss = b.value;

    this.ob = this.userService.ResetPassword(this.uss).subscribe((data) => {
      let ref = document.getElementById('cancel');
      b.reset();
      ref.click();
      this.toastr.success('Notification', 'Succesfully Resseted Password');
    });
  }

  callcul(g: NgForm) {
    let height = g.value.heightt;
    let weight = g.value.weightt;

    this.result = weight / (height * height);
    if (this.result < 16) this.comment = 'Severe Thinness';
    if (this.result > 18.5 && this.result < 25) this.comment = 'Normal';
    if (this.result > 25 && this.result < 30) this.comment = 'Overweight';
    if (this.result > 30) this.comment = 'Obese ';
  }


  SendMessage(boc:any) {  
    console.log(boc);
    console.log(this.formMessage.value);

    this.ob = this.messageservice.PostMessage(this.formMessage.value,boc).subscribe((data) => {
      if(data==true)
      {
      this.formMessage.reset();
      this.toastr.success('Notification', 'Succesfully Send Message');
      }
      else 
      this.toastr.warning('Notification', 'The Mail you provided is not a valid email address');

    });

    
    console.log(boc);
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
