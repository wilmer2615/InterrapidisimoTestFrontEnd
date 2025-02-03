import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Student } from '../../models/student.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm!: FormGroup;
  private loginService = inject(LoginService);  

   constructor(private fb: FormBuilder, public router:Router) {
  
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }  

  addRegisterStudent(){
    const student:Student = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      phone: this.registerForm.get('phone')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.loginService.addRegisterStudent(student).subscribe(resp =>{
      if(resp){
        Swal.fire({
          icon: "success",
          title: "Registro exitoso"
        })
        this.registerForm.reset();
      }
    })
  }

  onEmailInput() {
    const emailControl = this.registerForm.get('email');
    const emailValue = emailControl?.value;

    if (emailValue) {
      emailControl?.setValue(emailValue.toLowerCase(), { emitEvent: false });
    }
  }

  redirecTo(){
    this.router.navigate(['/login']);
  }
}
