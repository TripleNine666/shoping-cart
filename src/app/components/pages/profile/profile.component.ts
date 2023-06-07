import {Component, OnInit} from '@angular/core';
import {User} from "../../../interfaces/User";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private authService: AuthService,
              private userService: UserService,
              private fb: FormBuilder
  ) { }

  userId: number = 0;

  userForm = this.fb.group({
    nickname: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  })

  get nickname() {
    return this.userForm.get('nickname');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
  get address() {
    return this.userForm.get('address');
  }


  editMode: boolean = false; // the current mode

  ngOnInit() {
    this.userId = this.authService.getUser().id;
    this.userForm.patchValue(this.authService.getUser());
    console.log(this.userForm);
    this.editMode = false; // set the initial mode to view
  }

  // toggle the edit mode and reset the user if cancelled
  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.userForm.patchValue(this.authService.getUser());
    }
  }

  // update the user using authService and switch to view mode
  saveUser(): void {
    console.log(this.userForm.value)
    this.userService.updateUser(this.userId, this.userForm.value as User).subscribe(user => {
      this.userForm.patchValue(user);
      this.editMode = false;
    });
  }

}
