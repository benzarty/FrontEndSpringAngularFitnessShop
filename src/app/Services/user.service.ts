import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  PATH_OF_API = 'http://localhost:9090';
  //fil classe jwtfilter kol request ye7eb 3la header donc na7na 9ouloulou manech passin chay
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  constructor(private httpclient:HttpClient,private userAuthService: AuthService) { }


  public login(loginData:any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public Register(loginData:any) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRoles) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } 
        }
      }
    }
    return false;
  }



  public GetAllUsers() : Observable<User[]>{
    return this.httpclient.get<User[]>(environment.URL + '/retrieve-all-users', {
      responseType: 'json',
    });
  }
  public AddUserAdminSide(user:User) : Observable<User>{
    return this.httpclient.post<User>(environment.URL + '/add-user',user, {
      responseType: 'json',
    });
  }

  deleteUserById(id: String): Observable<any> {
    return this.httpclient.delete<any>(environment.URL +'/remove-user/'+id);

  }

    updateUser(user: User): Observable<User>{
    return this.httpclient.put<User>(environment.URL +'/modify-user',user,{
      responseType: 'json',
    });
  }


}
