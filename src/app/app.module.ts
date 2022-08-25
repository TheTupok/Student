import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {StudentPageComponent} from './pages/student-page/student-page.component';
import {StudentComponent} from "./components/student/student.component";
import {MatTableModule} from "@angular/material/table";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApiModule, BASE_PATH} from "./core/services/swagger-gen";
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogCreateUser} from "./components/modals/modal-create/modal.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ModalEditComponent } from './components/modals/modal-edit/modal-edit.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent,
    StudentComponent,
    DialogCreateUser,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    NgbModule,
    ApiModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  providers: [{provide: BASE_PATH, useValue: 'http://localhost:5000'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
