import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';

@NgModule({
  //apenas componentes
  declarations: [
    AppComponent
  ],

  //apenas modulos
  imports: [
    BrowserModule,
    HttpClientModule, //modulo necessario para poder trabalhar com o HttpClient
    PhotosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
