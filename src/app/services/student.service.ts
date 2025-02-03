import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { environments } from '../environments/environments.dev';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
import { LoginResult } from '../models/loginResult.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }


  addRegisterStudent(student: Student){
    return this.http.post(environments.endPointStudent + environments.controllerStudent + '/Register', student)
  }

  login(account: Account):Observable<LoginResult>{
    return this.http.post<LoginResult>(environments.endPointStudent + environments.controllerStudent + '/Login', account)
  }

  getStudentsByCourses(id: number):Observable<Student[]>{
    return this.http.get<Student[]>(`${environments.endPointStudent}${environments.controllerStudent}/students-by-course/${id}`);
  }
}
