import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlertModule } from "../shared/components/alert/alert.module";
import { LoadingModule } from "../shared/components/loading/loading.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { RequestInterceptor } from "./request.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AlertModule,
    RouterModule, //permite usar a diretiva routerLink dentre outras
    LoadingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
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
