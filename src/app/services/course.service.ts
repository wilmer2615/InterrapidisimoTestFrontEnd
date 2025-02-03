import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments.dev';
import { CoursesResult } from '../models/coursesResult.model';
import { Observable } from 'rxjs';
import { RegisterCourse } from '../models/registerCourse.model';
import { Credits } from '../models/credits.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getCourseByTeacher(studentId: number):Observable<CoursesResult[]>{
    return this.http.get<CoursesResult[]>(`${environments.endPointStudent}${environments.controllerCourse}/${studentId}`);
  }

  addCourse(course: RegisterCourse):Observable<CoursesResult>{
    return this.http.post<CoursesResult>(environments.endPointStudent + environments.controllerRegisteredCourse, course)
  }

  getRegisteredCourses(id: number):Observable<CoursesResult[]>{
    return this.http.get<CoursesResult[]>(`${environments.endPointStudent}${environments.controllerRegisteredCourse}/${id}`);
  }

  getCreditsByStudent(id: number):Observable<Credits>{
    return this.http.get<Credits>(`${environments.endPointStudent}${environments.controllerStudent}/credits-student/${id}`);
  }

  deleteRegisterCourse(studentId: number, courseId: number){
    return this.http.delete(`${environments.endPointStudent}${environments.controllerRegisteredCourse}/${studentId}/${courseId}`);
  }
}
