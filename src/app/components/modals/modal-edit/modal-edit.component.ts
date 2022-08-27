import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../core/services/swagger-gen";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InternalUserService} from "../../../core/services/internal-user.service";

export interface EditDialogData {
  user: User;
  realServer: boolean
}

@Component({
  selector: 'app-modals-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private internalUserService: InternalUserService,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
  ) {
  }

  ngOnInit() {
    this._createForm();
    this.editUserForm.patchValue(this.data.user);
  }

  private _createForm() {
    this.editUserForm = this.fb.group({
      id: '',
      name: '',
      group: '',
      course: ''
    });
  }

  onSubmit() {
    this.internalUserService.editStudent(this.data.realServer, this.editUserForm.getRawValue()).subscribe();
  }
}
