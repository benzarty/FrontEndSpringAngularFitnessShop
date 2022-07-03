import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})
export class SidbarComponent implements OnInit {

  constructor(private userauthService:AuthService) { }

  ngOnInit(): void {
  }

  public logout() { this.userauthService.clear(); }


}
