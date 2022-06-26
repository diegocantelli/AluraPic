import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective{

  @Input() brightness = '70%'

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2){}

  @HostListener('mouseover') //irá escutar o evento no qual a diretiva apDarkenOnHover estiver colocada
  darkenOn(){
    this.render.setStyle(this.elementRef.nativeElement, 'filter', `brightness(${this.brightness})`);
    console.log('darken on');
  }

  @HostListener('mouseleave')
  darkenOff(){
    this.render.setStyle(this.elementRef.nativeElement, 'filter', 'brightness(100%)');
    console.log('darken off');
  }
}
