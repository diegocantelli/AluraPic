import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PhotoComponent } from "./photo/photo.component";
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';

@NgModule({
    declarations: [
      PhotoComponent,
      PhotoListComponent,
      PhotoFormComponent,
      PhotosComponent
    ], //Os componentes que este módulo usa/precisa
    imports: [
      HttpClientModule,
      CommonModule //modulo que importa as diretivas ngIf, ngFor e etc
    ]
})
export class PhotosModule {}
