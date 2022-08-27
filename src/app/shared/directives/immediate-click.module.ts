import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImmediateClickDirective } from "./immediate-click.directive";

@NgModule({
  declarations: [ImmediateClickDirective], //Os compoenentes, diretivas e etc que este modulo importa
  exports: [ImmediateClickDirective],
  imports: [CommonModule]
})
export class ImmediateClickModule{

}
