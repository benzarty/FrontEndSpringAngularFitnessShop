import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  token: any;
  formuser: FormGroup;
  Client: User;
  userFile;
  imgURL: any;
  public message: string;
  public imagePath;
  oldpassword: any;
  ob: Subscription;

  constructor(
    private auth: AuthService,
    public us: UserService,
    private formbuider: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.getUsre();
    this.infoForm();
  }

  infoForm() {
    this.formuser = this.formbuider.group({
      userFirstName: ['', [Validators.required]],
      userName: ['', [Validators.required]],

      userLastName: ['', [Validators.required]],

      userPassword: ['', [Validators.required]],
      oldpassword: ['', [Validators.required]],

      
      phone: ['', [Validators.required]],
      fileName: ['', [Validators.required]],

      email: ['', [Validators.required]],
    });

    this.token = this.auth.getToken();

    const decoded = this.getDecodedAccessToken(this.token);

    const username = decoded.sub;

    this.us.GetUserByid(username).subscribe((res) => {
      this.Client = res;


      this.formuser.controls['userFirstName'].setValue(
        this.Client.userFirstName
      );
      this.formuser.controls['userLastName'].setValue(this.Client.userLastName);
      this.formuser.controls['phone'].setValue(this.Client.phone);
      this.formuser.controls['email'].setValue(this.Client.email);

      this.formuser.controls['userName'].setValue(this.Client.userName);
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  UpdateUsergo() {
    const formData = new FormData();


    const user = this.formuser.value;

    this.formuser.reset();

    console.log(user);
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile);
    this.ob = this.us.createData(formData).subscribe((data) => {
     if(data==true)
     {
      this.toastr.success('Notification', 'Succesfully Changed Personnal Information');
this.logout();
this.router.navigate(['/Home']);



    }

      else 
      {
        window.location.reload();

      this.toastr.error('Notification', 'Error while Changing password,Check validity of your old password');


      }

    });
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


    public logout() { this.auth.clear(); }

}
