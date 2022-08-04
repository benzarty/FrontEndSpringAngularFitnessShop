import jwt_decode from 'jwt-decode';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { MessagesService } from 'src/app/Services/messages.service';
import { Messages } from 'src/app/Models/Messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  token: any;
  ob: Subscription;
  public usertab: User;
  messagetab: Messages[];

  listInitial: Messages[];

  constructor(
    private auth: AuthService,
    private us: UserService,
    private message: MessagesService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

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

  Test(r: any) {

    this.ob = this.message.readMail(r).subscribe((res) => {
      this.usertab = res;

    });

    


    this.token = this.auth.getToken();

    const decoded = this.getDecodedAccessToken(this.token);

    const username = decoded.sub;

    this.ob = this.us.GetUserByid(username).subscribe((res) => {
      this.usertab = res;

      this.message.getMessages(this.usertab).subscribe((res) => {
        this.messagetab = res;

        this.listInitial = this.messagetab.filter((res) => {
          return res.idMessage === r;
        });
      });
    });
  }

  Delete(r: any) {
    this.message.deleteMessage(r).subscribe((res) => {
      this.toastr.success('Notification', 'Succesfully Deleted');

      this.getAllMailAdmin();
    });
  }
  postreply(f: any, mailmail) {
    this.message.sendtoUsers(f.value, mailmail.value).subscribe((res) => {
      this.toastr.success('Notification', 'Reply sent successfully');
    });
  }

postadd(g:any)
{

  this.message.sendtoUsers2(g.value).subscribe((res) => {
    this.toastr.success('Notification', 'Message sent successfully');

    let ref = document.getElementById('close');
    ref?.click();
  });
  
}

}
