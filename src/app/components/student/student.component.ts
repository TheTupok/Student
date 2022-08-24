import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "../../core/services/swagger-gen";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateUser} from "../modal/modal.component";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'group', 'course'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);

  constructor(
    private userService: UsersService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initDataSource()
  }

  private initDataSource(): void {
    this.userService.getStudents().subscribe((data) => {
      this.dataSource.data = data;
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  removeSelectedStudent() {
    const ids = this.selection.selected.map(x => Number(x.id));
    const removeOperations$ = ids.map(x => this.userService.deleteStudentById(x));
    forkJoin(removeOperations$).subscribe(() => this.initDataSource())
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateUser);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
