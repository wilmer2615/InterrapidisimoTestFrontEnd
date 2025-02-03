import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course/add-course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseGroupComponent } from './course-group/course-group.component';



@NgModule({
  declarations: [
    AddCourseComponent,
    DashboardComponent,
    CourseGroupComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class PagesModule { }
