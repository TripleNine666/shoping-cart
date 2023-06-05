import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/User";
import {tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  usersUrl = 'api/users';

  addEmptyUser(phoneNumber: string){
    const emptyUser = {
      phoneNumber,
      nickname: 'user',
      orderHistory: []
    }
    return this.http.post<User>(this.usersUrl, emptyUser, this.httpOptions).pipe(
      tap(user => {
        this.authService.storeUser(user);
        this.authService.setAuthState(true, user);
      })
    )
  }
}
