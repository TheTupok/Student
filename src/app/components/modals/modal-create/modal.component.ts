import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {InternalUserService} from "../../../core/services/internal-user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'dialog-content',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class DialogCreateUser implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private internalUserService: InternalUserService,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {
  }

  ngOnInit() {
    this._createForm()
  }

  private _createForm() {
    this.createUserForm = this.fb.group({
      name: '',
      group: '',
      course: ''
    });
  }

  onSubmit() {
    this.internalUserService.createStudent(this.data,this.createUserForm.getRawValue()).subscribe()
  }
}
