import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { LoginService } from '../../services/login.service';
import { jwtDecode } from "jwt-decode";
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  private loginService = inject(LoginService); 
  private accountService = inject(AccountService);

   constructor(private fb: FormBuilder, public router:Router) {
  
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }  

  login() {
    const account: Account = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
  
    this.loginService.login(account).subscribe({
      next: (resp) => {
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          let decodedToken: any = jwtDecode<any>(resp.token);
  
          let account: Student = {
            id: parseInt(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]),
            name: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            phone: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"]
          };
  
          this.accountService.setAccount(account);
  
          Swal.fire({
            icon: "success",
            title: "Login exitoso"
          });
  
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: err          
        });
      }
    });
  }
  

  onEmailInput() {
    const emailControl = this.loginForm.get('email');
    const emailValue = emailControl?.value;

    if (emailValue) {
      emailControl?.setValue(emailValue.toLowerCase(), { emitEvent: false });
    }
  }

}
