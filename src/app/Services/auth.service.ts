import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //storing and retriving data from local storage

  constructor(private router:Router) { }
  public setRoles(roles: []){
    localStorage.setItem("roles",JSON.stringify(roles))  //bech converti array to string

  }

  public getRoles():[] //7achetena raje3ou array houni
  {
     return JSON.parse(localStorage.getItem('roles'));
    
    }
    public setToken(jwtToken: string) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  
    public getToken(): string {
      return localStorage.getItem('jwtToken');
    }
  
    public clear() {
      localStorage.clear();
      this.router.navigate(['/Home']);

    }
  
    public isLoggedIn() {
      return this.getRoles() && this.getToken();
    }
  }
  