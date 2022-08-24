import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'dialog-content',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class DialogCreateUser implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this._createForm()
  }

  private _createForm(){
    this.myForm = this.fb.group({
      name: '',
      group: '',
      course: ''
    });
  }



  onSubmit(form: FormGroup) {
    console.log('Name:', form.value.name)
    console.log('Group:', form.value.group)
    console.log('Course:', form.value.course)
  }
}
