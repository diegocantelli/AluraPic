import { NgModule } from "@angular/core";
import { PhotoComponent } from "./photo/photo.component";

@NgModule({
    declarations: [ PhotoComponent ], //Os componentes que este módulo usa/precisa
    exports: [ PhotoComponent ] //Torna o componente acessível para quem importar este módulo
})
export class PhotosModule {}
