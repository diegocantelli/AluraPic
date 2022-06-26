import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent {

  loginForm!: FormGroup;
}
