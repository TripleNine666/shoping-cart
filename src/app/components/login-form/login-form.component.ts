import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { SearchCountryField, CountryISO  } from 'ngx-intl-tel-input';
import {UserService} from "../../services/user.service";
import {TranslateService} from "@ngx-translate/core";

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


  codeSent = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private userService: UserService,
              private translate: TranslateService,
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

  onSubmit(): void {
    const phoneNumber = this.phoneNumber!.value!.number;
    const code = Number(this.loginForm.get('code')?.value);
    if (!code) {
      this.authService.sendCode(phoneNumber).subscribe(
        response => {
          if (!response.userExists) {
            this.userService.addEmptyUser(phoneNumber).subscribe(user => console.log(user))
          }
          console.log(response.code);
          this.codeSent = true;
          this.messageService.add({ severity: 'success',
            summary: this.translate.instant('messages.success.success'),
            detail: this.translate.instant('messages.success.phone.code')})
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: this.translate.instant('messages.error.error'),
            detail: `Phone error`})
        }
      );
    } else {
      this.authService.verifyCode(phoneNumber, code).subscribe(
        resp => {
          console.log(resp)
          this.messageService.add({ severity: 'success',
            summary: this.translate.instant('messages.success.success'),
            detail: this.translate.instant('messages.success.phone.login')})
          // emit to close dialog window
          this.loginSuccess.emit();
          if (this.redirectPath) {
            this.router.navigateByUrl(this.redirectPath).then();
          }
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: this.translate.instant('messages.error.error'),
            detail: this.translate.instant('messages.error.code')})
        }
      );
    }
  }
}
