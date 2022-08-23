import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/models/student';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent implements OnInit {
  title = 'Student App';

  constructor() { }

  ngOnInit(): void {
  }

}
