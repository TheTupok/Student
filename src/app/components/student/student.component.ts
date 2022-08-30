import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "../../core/services/swagger-gen";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {concat,} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateUser} from "../modals/modal-create/modal.component";
import {ModalEditComponent} from "../modals/modal-edit/modal-edit.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {InternalUserService} from "../../core/services/internal-user.service";
import {LoginDialogComponent} from "../modals/login-dialog/login-dialog.component";
import {StorageUserService} from "../../core/services/users-local.service";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})

export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'group', 'course', 'edit'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  configurationForm: FormGroup;

  language = 'en'
  realServer = false
  SearchTerm = ''

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private internalUserService: InternalUserService,
    public dialog: MatDialog,
    public storageUserService: StorageUserService
  ) {
  }

  ngOnInit(): void {
    this._createConfigurationForm()
    this.configurationForm.controls['ToggleServer'].valueChanges
      .subscribe((value) => {
        this.realServer = value
        this.initDataSource(this.realServer, this.SearchTerm)
      })

    this.configurationForm.controls['Language'].valueChanges
      .subscribe(newValue => {
        this.language = newValue
        this.translateService.use(this.language)
      })

    this.configurationForm.controls['SearchTerm'].valueChanges
      .subscribe(data => {
        this.SearchTerm = data
        this.initDataSource(this.realServer, this.SearchTerm)
      })

    this.initDataSource(this.realServer, this.SearchTerm)
  }

  private _createConfigurationForm() {
    this.configurationForm = this.fb.group({
      ToggleServer: false,
      Language: 'en',
      SearchTerm: '',
      undoId: 0
    });
  }

  isTokenExists() {
    return localStorage.getItem('Token') != null;
  }

  public initDataSource(isRealServer: boolean, searchTerm: string): void {
    this.internalUserService.getAllStudents(isRealServer, searchTerm).subscribe(data => {
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

  openCreateStudentDialog(realServer: boolean): void {
    const dialogRef = this.dialog.open(DialogCreateUser, {
      data: realServer
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource(this.realServer, this.SearchTerm)
    })
  }

  openEditStudentDialog(realServer: boolean, user: User): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      data: {user, realServer}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource(this.realServer, this.SearchTerm)
    })
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.initDataSource(this.realServer, this.SearchTerm)
    })
  }

  removeSelectedStudents() {
    const ids = this.selection.selected.map(x => Number(x.id));
    const removeOperations$ = ids.map(x => this.internalUserService.deleteById(this.realServer, x));
    concat(...removeOperations$).subscribe(() => this.initDataSource(this.realServer, this.SearchTerm));
  }

  onSubmitUndo(){
    this.userService.undoById(this.configurationForm.controls['undoId'].value).subscribe(() =>{
      this.initDataSource(this.realServer, this.SearchTerm)
    })
  }
}
