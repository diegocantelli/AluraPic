import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective{

  constructor(private elementRef: ElementRef){

  }

  @HostListener('mouseover') //irá escutar o evento no qual a diretiva apDarkenOnHover estiver colocada
  darkenOn(){
    console.log('darken on');
  }

  @HostListener('mouseleave')
  darkenOff(){
    console.log('darken off');
  }
}
