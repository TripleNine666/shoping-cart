import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersUrl = 'api/users';

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.authState = new BehaviorSubject<{isAuth: boolean, user: User}>({
      isAuth: !!token,
      user: this.getUser(),
    });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private authState = new BehaviorSubject<{isAuth: boolean, user: User}>({
    isAuth: false,
    user: {id: 0, nickname: '', phoneNumber: '', orderHistory  : []}});


  // метод для получения Observable из authState
  getAuthState$(): Observable<{isAuth: boolean, user: User}> {
    return this.authState.asObservable();
  }

  // метод для установки нового значения authState
  setAuthState(isAuth: boolean, user: User): void {
    this.authState.next({isAuth, user});
  }

  // Mock method to send a verification code to the phone number
  sendCode(phoneNumber: string): Observable<any> {
    return this.http.post<any>('api/sendCode', { phoneNumber })
      .pipe(map(response => {
        // Mock response with a random code
        return response;
      }));
  }

  // Mock method to verify the code and get a JWT token
  verifyCode(phoneNumber: string, code: number): Observable<any> {
    return this.http.post<any>('api/verifyCode', { code }).pipe(
      switchMap(response => {
        this.storeToken(response.token);
        return this.getUserByPhoneNumber(phoneNumber).pipe(
          switchMap(user => {
            if (user) {
              this.storeUser(user);
              this.setAuthState(true, user);
            } else {
              return this.addEmptyUser(phoneNumber);
            }
            return of(response);
          })
        );
      })
    );
  }


  // Mock method to store the token in local storage
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  storeUser(user: any){
    localStorage.setItem('user', JSON.stringify(user))
  }

  // метод для получения user
  getUser(): User {
    // получаем user из localStorage и преобразуем в объект
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  // Mock method to get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // метод для проверки авторизации
  isAuth(): boolean {
    // получаем токен из localStorage
    const token = localStorage.getItem('token');
    // возвращаем true, если токен есть, и false, если нет
    return !!token;
  }

  // метод для выхода
  logOut(): void {
    // очищаем localStorage
    localStorage.clear();
    this.setAuthState(false, this.getUser());
  }

  getUserByPhoneNumber(phoneNumber: string): Observable<User|undefined> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => users.find(user => user.phoneNumber === phoneNumber))
    );
  }

  addEmptyUser(phoneNumber: string): Observable<User>{
    const emptyUser = {
      phoneNumber,
      nickname: 'user',
      orderHistory: []
    }
    return this.http.post<User>(this.usersUrl, emptyUser, this.httpOptions).pipe(
      tap(user => {
        this.storeUser(user);
        this.setAuthState(true, user);
      })
    )
  }

}
