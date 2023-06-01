import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../../../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    const token = this.getToken();
    this.authState = new BehaviorSubject<{isAuth: boolean, user: User}>({
      isAuth: !!token,
      user: this.getUser(),
    });
  }

  private authState = new BehaviorSubject<{isAuth: boolean, user: User}>({
    isAuth: false,
    user: {nickname: '', phoneNumber: ''}});


  // метод для получения Observable из authState
  getAuthState$(): Observable<{isAuth: boolean, user: any}> {
    return this.authState.asObservable();
  }

  // метод для установки нового значения authState
  setAuthState(isAuth: boolean, user: any): void {
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
    return this.http.post<any>('api/verifyCode', { phoneNumber, code }).pipe(
      map(response => {
        console.log(response.user)
        // сохраняем токен и user в localStorage
        this.storeToken(response.token);
        this.storeUser(response.user);
        // обновляем authState
        this.setAuthState(true, response.user);
        return response;
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

  // // метод для добавления нового заказа в orderHistory
  // addOrder(order: any): void {
  //   // получаем текущий user
  //   const user = this.getUser();
  //   // проверяем, есть ли у user свойство orderHistory
  //   if (!user.orderHistory) {
  //     // если нет, то создаем его как пустой массив
  //     user.orderHistory = [];
  //   }
  //   // добавляем новый заказ в начало массива
  //   user.orderHistory.unshift(order);
  //   // сохраняем обновленный user
  //   this.storeUser(user);
  // }

  // метод для выхода
  logOut(): void {
    // очищаем localStorage
    localStorage.clear();
    this.setAuthState(false, {isAuth: false, user: {nickname: '', phoneNumber: ''}});
    // делаем другие действия, например, перенаправляем на страницу входа
  }

}
