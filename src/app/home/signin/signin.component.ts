import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{

  loginForm!: FormGroup;

  // @ViewChild('userNameInput') -> irá guardar uma referencia para o elemento do dom com este identificador
  @ViewChild('inputUserName') inputUserName!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private platformDetectionService: PlatformDetectorService){}

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
        complete: () => {
          console.log('Autenticado');
          this.router.navigate(['user', userName]);
        },
        error: (error) => {
          this.loginForm.reset();

          this.platformDetectionService.isPlatformBrowser() &&
            this.inputUserName.nativeElement.focus();
        }
      }
    );
  }
}
