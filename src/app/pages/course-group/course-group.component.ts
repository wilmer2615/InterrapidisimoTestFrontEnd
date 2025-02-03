import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-course-group',
  templateUrl: './course-group.component.html',
  styleUrl: './course-group.component.css'
})
export class CourseGroupComponent implements OnInit {

  studentsList: Student[] = [];
  private studentService = inject(StudentService);
  @Input() courseId!: number;

  constructor(public activeModal: NgbActiveModal, public router: Router) {}


  ngOnInit(): void {
    this.getStudentsByCourses();
  }

  getStudentsByCourses() {
    this.studentService.getStudentsByCourses(this.courseId).subscribe(resp => {
      if (resp) {
        this.studentsList = resp;
      }
    })
  }

}
