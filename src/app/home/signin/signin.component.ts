import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    console.log('Efetuando login');
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authservice.authenticate(userName, password)
      .subscribe({
        complete: () => console.log('Autenticado'),
        error: (error) => this.loginForm.reset()
      }
    );
  }
}
