import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService{

  alertSubject: Subject<Alert | null> = new Subject<Alert | null>();
  keepAfterRouteChanged = false;

  constructor(router: Router){
    router.events.subscribe(event => {
      //event instanceof NavigationStart: verifica se foi dado início a uma nova navegacao
      if(event instanceof NavigationStart){
        if(this.keepAfterRouteChanged){
          this.keepAfterRouteChanged = false;
        } else {
          this.clear();
        }
      }
    })
  }

  success(message: string, keepAfterRouteChanged: boolean = false){
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChanged);
  }

  info(message: string, keepAfterRouteChanged: boolean = false){
    this.alert(AlertType.INFO, message, keepAfterRouteChanged);
  }

  warning(message: string, keepAfterRouteChanged: boolean = false){
    this.alert(AlertType.WARNING, message, keepAfterRouteChanged);
  }

  danger(message: string, keepAfterRouteChanged: boolean = false){
    this.alert(AlertType.DANGER, message, keepAfterRouteChanged);
  }

  private alert(alertType: AlertType, message: string, keepAfterRouteChanged: boolean){
    this.keepAfterRouteChanged = keepAfterRouteChanged;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert(){
    //quem se inscrever nesta observable ira obter os valores obtidos pelos demais metodos deste serviço
    return this.alertSubject.asObservable();
  }

  clear(){
    //irá enviar uma notificacao nula, o que ira ter o efeito de limpar a notificacao da tela
    this.alertSubject.next(null);
  }

}
