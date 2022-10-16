import { FormGroup, ValidatorFn } from "@angular/forms";

export const userNamePassword = (formGroup: FormGroup) => {
  const userName = formGroup.get('userName')?.value;
  const password = formGroup.get('password')?.value;

  // se ambos os campos nao estao em branco faz a validacao
  if(userName.trim() + password.trim()){
    return userName != password
      ? null
      : { userNamePassword: true };
  } else {
    return null;
  }

}
