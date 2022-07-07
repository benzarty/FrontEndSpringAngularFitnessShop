import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  searchtext:any;
  formValue !: FormGroup;
  userObject: User;
  showaddButton: boolean;
  showupdateButton: boolean;

  listUsers: User[];


  constructor(private userservice: UserService, private route: Router, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ob:Subscription



  ngOnDestroy(): void {

    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      userFirstName: ["", [Validators.required]],
      userLastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      active: ['', [Validators.required]],
      picture: ['', [Validators.required]],
      email: ['', [Validators.required]],

    })

    this.GetAllUsers()

  }


  GetAllUsers() {
    this.ob=this.userservice.GetAllUsers().subscribe(res => {
      this.listUsers = res;
      console.log(this.listUsers);

    });
  }



  AddUserAdminReactive() {

    this.userObject = this.formValue.value
    this.ob=this.userservice.AddUserAdminSide(this.userObject).subscribe(
      {
        next: (value: any) => {

          this.formValue.reset();
          //notif houni

          let ref = document.getElementById('cancel');
          ref?.click();
          this.GetAllUsers();
          this.toastr.success('Notification', 'Succesfully Added');

        },
        error: err => console.error(err),
        complete: () => console.log('DONE!')
      }
    )


  }


  goToDeleteUsers(id: String) {


    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {


      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );

        this.ob=this.userservice.deleteUserById(id).subscribe(

          res => {
            this.GetAllUsers();

          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });



  }










  EditUser(row: User) {

    this.showaddButton = false;
    this.showupdateButton = true;
    this.formValue.controls['userFirstName'].setValue(row.userFirstName);
    this.formValue.controls['userLastName'].setValue(row.userLastName);

    this.formValue.controls['userName'].setValue(row.userName);

    this.formValue.controls['userPassword'].setValue(row.userPassword);

    this.formValue.controls['phone'].setValue(row.phone);

    this.formValue.controls['active'].setValue(row.active);

    this.formValue.controls['picture'].setValue(row.picture);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['role'].setValue(row.role);



  }
  UpdateUsergo() {
    this.userObject = this.formValue.value

    this.ob=this.userservice.updateUser(this.userObject).subscribe(

      res => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.GetAllUsers();
        this.toastr.success('Notification', 'Succesfully updated');

      }
    )


  }

  clickAddButtonTest() {
    this.formValue.reset();
    this.showaddButton = true;
    this.showupdateButton = false;
  }



}
