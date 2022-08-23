import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentPageComponent} from "./pages/student-page/student-page.component";

const routes: Routes = [
  {path:'', component: StudentPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
