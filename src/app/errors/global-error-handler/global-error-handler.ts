import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { UserService } from "src/app/user/user.service";
import * as StackTrace from "stacktrace-js";

// Permite que esta classe receba injeção de dependeencia
// Este decorator não possui a propriedade provided-in, pois ela já está sendo registrada como um provider
// no módulo errors.module
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  //Injector: serve para podermos obter uma instancia de um objeto sob demanda
  constructor(private injector: Injector){}

  handleError(error: any): void {

    console.log('Passei pelo handler');

    // obtendo uma instancia de LocationStrategy sob demanda
    // Location strategy pode retornar 2 implementacoes? PathLocationStrategy e HashLocationStrategy
    const location = this.injector.get(LocationStrategy);

    const userService = this.injector.get(UserService);

    // só nos interessa a instancia de PathLocatinStrategy
    const url = location instanceof PathLocationStrategy
      ? location.path
      : '';



    const message = error.message ? error.message : error.toString();

    StackTrace.fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

          console.log(message);
          console.log(stackAsString);

          console.log('O que será enviado para o servidor');
          console.log({ message, url, userName: userService.getUserName(), stack: stackAsString});
      });
  }

}
