import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
const routes: Routes = [

  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: StudentsListComponent },
  { path: 'task',
    children: [
                { path: '', component: AddStudentComponent },
                { path: ':id', component: EditStudentComponent }
              ]
  },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
