import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  //apenas componentes
  declarations: [
    AppComponent
  ],

  //apenas modulos
  imports: [
    BrowserModule,
    PhotosModule,
    AppRoutingModule, //importando o arquivo que define as rotas da aplicacao
    ErrorsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
