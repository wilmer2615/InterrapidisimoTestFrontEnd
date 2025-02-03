import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { environments } from '../environments/environments.dev';
import { Account } from '../models/account.model';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResult } from '../models/loginResult.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  addRegisterStudent(student: Student){
    return this.http.post(environments.endPointStudent + environments.controllerLogin + '/Register', student)
  }

  login(account: Account):Observable<LoginResult>{
    return this.http.post<LoginResult>(environments.endPointStudent + environments.controllerLogin + '/Login', account)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(error.error.message);
       
    }
    return throwError('Ocurrió un error inesperado');
  }
}
