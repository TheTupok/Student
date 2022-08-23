import {Component} from '@angular/core';
import {students} from "../../data/students";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataStudent = students;
}
