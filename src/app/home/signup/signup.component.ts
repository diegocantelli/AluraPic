import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ] //este servico deixa de ser 'root'e passa ter seu escopo valido apenas dentro deste componente
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userNotTakenValidatorService:UserNotTakenValidatorService,
    private signupService: SignUpService,
    private router: Router){

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(40)
        ],
        //validador assíncrono
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    })
  }

  signup(){

    if(this.signupForm.valid && !this.signupForm.pending){
      // getRawValue: retorna os dados do formulario, preenchidos ou nao
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService
        .signup(newUser)
        .subscribe(
          {
            complete: () => this.router.navigate(['']),
            error: (err) => console.log(err)
          });
    }
  }
}
