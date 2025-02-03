import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

let account: Student = {} as Student;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account$ = new BehaviorSubject<Student>(account);

  constructor() { }

  get getAccount$():Observable<Student>{
    return this.account$.asObservable();
  }

  setAccount(account:any):void{
  this.account$.next(account);
  }
}
