import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //storing and retriving data from local storage

  constructor() { }
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
    }
  
    public isLoggedIn() {
      return this.getRoles() && this.getToken();
    }
  }
  