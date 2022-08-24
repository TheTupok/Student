import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../../../core/services/swagger-gen";

@Component({
  selector: 'dialog-content',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class DialogCreateUser implements OnInit {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    this._createForm()
  }

  private _createForm() {
    this.myForm = this.fb.group({
      name: '',
      group: '',
      course: ''
    });
  }

  onSubmit() {
    this.userService.createStudent(this.myForm.getRawValue()).subscribe()
  }
}
