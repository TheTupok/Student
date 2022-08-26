import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User, UsersService} from "../../core/services/swagger-gen";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {concat, fromEvent, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateUser} from "../modals/modal-create/modal.component";
import {ModalEditComponent} from "../modals/modal-edit/modal-edit.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})

export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'group', 'course', 'edit'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  configurationForm: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initDataSource()
    this._createConfigurationForm()

    this.configurationForm.controls['Language'].valueChanges
      .subscribe(newValue => this.translateService.use(newValue))
  }

  private initDataSource(): void {
    this.userService.getAlltudents().subscribe((data) => {
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

  openCreateStudentDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateUser);
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource()
    })
  }

  openEditStudentDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource()
    })
  }

  removeSelectedStudent() {
    const ids = this.selection.selected.map(x => Number(x.id));
    const removeOperations$ = ids.map(x => this.userService.deleteStudentById(x));
    concat(...removeOperations$).subscribe(() => this.initDataSource());
  }

  @ViewChild('filter') filter: ElementRef;

  ngAfterViewInit() {
    fromEvent(this.filter.nativeElement, 'input')
      .pipe(switchMap((data: any) => this.userService.getFilteredStudents(data.target.value)))
      .subscribe((data) => {
        this.dataSource.data = data
      });
  }

  private _createConfigurationForm() {
    this.configurationForm = this.fb.group({
      toggleServer: true,
      Language: 'en'
    });
  }
}
