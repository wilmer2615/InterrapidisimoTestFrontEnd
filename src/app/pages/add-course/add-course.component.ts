import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course.service';
import { CoursesResult } from '../../models/coursesResult.model';
import { Student } from '../../models/student.model';
import { RegisterCourse } from '../../models/registerCourse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{
  
  @Input() account!: Student;
  @Input() usedCredits!: number;
  @Input() creditsByStudent!: number;
  private courseService = inject(CourseService);
  courses: CoursesResult[] = [];

  constructor(public activeModal: NgbActiveModal, public router: Router) {}

  ngOnInit(): void {
    this.getCourseByTeacher();
  }

  getCourseByTeacher() {
    this.courseService.getCourseByTeacher(this.account.id!).subscribe(resp =>{
      if(resp){
        this.courses = resp;
      }
    })
  }

  addCourse(courseSelected:CoursesResult){
    const course:RegisterCourse = {
      courseId : courseSelected.courseId,
      studentId: this.account.id!
    }

    this.courseService.addCourse(course).subscribe(resp =>{
      if(resp){
        Swal.fire({
          icon: "success",
          title: "Registro exitoso"
        })
        this.activeModal.close(true);
      }
    })
  }

}
