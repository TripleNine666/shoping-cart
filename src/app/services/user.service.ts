import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/User";
import {Observable, tap} from "rxjs";
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

  updateUser(userId: number, user: User): Observable<User>{
    return this.http.put<User>(`${this.usersUrl}/${userId}`, {...user, id: userId }).pipe(
      tap(user => {
        this.authService.storeUser(user);
        this.authService.setAuthState(true, user);
      })
    )
  }
}
