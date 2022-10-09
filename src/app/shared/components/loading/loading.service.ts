import { Injectable } from "@angular/core";
import { startWith, Subject } from "rxjs";
import { LoadingType } from "./loading-type";

@Injectable({ providedIn: 'root' })
export class LoadingService {

  // Subject: Emite o valor para o primeiro que se inscreveu, os demais nao receberão o valor que já foi emitido e lido pelo primeiro
  // BehaviorSubject: Emite o valor para todos os que estao inscritos
  loadingSubject = new Subject<LoadingType>();

  getLoading(){
    return this.loadingSubject.asObservable()
      .pipe(startWith(LoadingType.STOPPED)); //inicia a observable com o valor padrao stopped
  }

  //Este método será chamado pelo loading.interceptor
  start(){
    this.loadingSubject.next(LoadingType.LOADING);
  }

  //Este método será chamado pelo loading.interceptor
  stop(){
    this.loadingSubject.next(LoadingType.STOPPED);
  }

}
