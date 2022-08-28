import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../../../core/services/swagger-gen";
import {StorageUserService} from "../../../core/services/users-local.service";


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  hidePassword = true;
  loginUserForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private localStorage: StorageUserService
  ) {
  }

  ngOnInit() {
    this._createForm()
  }

  private _createForm() {
    this.loginUserForm = this.fb.group({
      login: '',
      password: ''
    });
  }

  onSubmit() {
    this.userService.loginUser(this.loginUserForm.getRawValue()).subscribe(data => {
      this.localStorage.createToken(data)
    })
  }
}
