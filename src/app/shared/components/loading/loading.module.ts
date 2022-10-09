import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading.component";
import { LoadingIntercerptor } from "./loading.interceptor";

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],

  //registra um interceptor que será utilizado com este módulo
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingIntercerptor,
    multi: true //permite que este interceptor seja usado em conjunto com outros interceptors
  }]
})
export class LoadingModule{

}
