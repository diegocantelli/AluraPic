import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { RequestInterceptor } from "./request.interceptor";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule //permite usar a diretiva routerLink dentre outras
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true //caso exista mais um interceptador e deseja-se que as requisicoes sejam enviadas a mais de um interceptor
    }
  ]
})
export class CoreModule{

}
