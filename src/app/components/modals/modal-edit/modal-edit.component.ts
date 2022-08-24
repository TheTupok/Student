import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User, UsersService} from "../../../core/services/swagger-gen";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-modals-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
  }

  ngOnInit() {
    this._createForm();
    this.myForm.patchValue(this.data);
  }

  private _createForm() {
    this.myForm = this.fb.group({
      id: '',
      name: '',
      group: '',
      course: ''
    });
  }

  onSubmit() {
    this.userService.updateStudent(this.myForm.getRawValue()).subscribe();
  }
}
