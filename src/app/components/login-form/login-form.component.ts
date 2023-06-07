import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { SearchCountryField, CountryISO  } from 'ngx-intl-tel-input';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Input() redirectPath?: string;
  @Output() loginSuccess = new EventEmitter<void>();
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;


  codeSent = false; // свойство для отслеживания состояния отправки кода
  errorMessage = ''; // свойство для отображения сообщения об ошибке

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private userService: UserService,
  ) { }

  loginForm = this.fb.group({
    phoneNumber: [
      {number: '', countryCode: ''},
      [Validators.required],
    ],
    code: [
      '',
      [Validators.required, Validators.minLength(4)],
    ]
  }) ;

  get phoneNumber() {
    return this.loginForm.get('phoneNumber');
  }

  get code() {
    return this.loginForm.get('code');
  }

  ngOnInit(): void {
  }

  // метод для отправки формы
  onSubmit(): void {
    const phoneNumber = this.phoneNumber!.value!.number;
    const code = Number(this.loginForm.get('code')?.value);
    if (!code) {
      // вызов метода сервиса для отправки кода на номер телефона
      this.authService.sendCode(phoneNumber).subscribe(
        response => {
          if (!response.userExists) {
            this.userService.addEmptyUser(phoneNumber).subscribe(user => console.log(user))
          }
          console.log(response.code);
          this.codeSent = true; // установка флага отправки кода
          this.messageService.add({ severity: 'success',
            summary: 'Success',
            detail: `Code received`})
        },
        error => {
          // обработка неуспешного ответа
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: 'Error',
            detail: `Phone error`})
        }
      );
    } else {
      // вызов метода сервиса для проверки кода и получения токена
      this.authService.verifyCode(phoneNumber, code).subscribe(
        resp => {
          // обработка успешного ответа
          console.log(resp)
          this.messageService.add({ severity: 'success',
            summary: 'Success',
            detail: `you have successfully logged in`})
          // emit to close dialog window
          this.loginSuccess.emit();
          if (this.redirectPath) {
            this.router.navigateByUrl(this.redirectPath).then();
          }
        },
        error => {
          // обработка неуспешного ответа
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: 'Error',
            detail: `Code Error`})
        }
      );
    }
  }
}
