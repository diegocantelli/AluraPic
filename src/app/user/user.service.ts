import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import jwt_decode from "jwt-decode";

import { TokenService } from '../core/token/token.service';
import { User } from './user';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserService {

  // BehaviorSubject -> emite um valor ate que alguem se inscreve e consuma o valor
  // o valor consumido sera o ultimo valor emitido pelo behavioSubject
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() &&
      this.decodeAndNotify();
  }

  setToken(token: string) {
      this.tokenService.setToken(token);
      this.decodeAndNotify();
  }

  getUser() {
    //atraves desse metodo sera possivel se inscrever na observable e obter as informacoes do usuario
    //que serao emitidas pelo metodo decodeAndNotity
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(){
    const token = this.tokenService.getToken();

    if(token){
      const user = jwt_decode(token) as User
      this.userSubject.next(user); //emite para quem estiver inscrito na observable os dados do usuario logados
    }
  }
}
