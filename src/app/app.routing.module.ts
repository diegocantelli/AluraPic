import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';

const routes: Routes = [
    { path: 'user/flavio', component: PhotoListComponent },
    { path: 'p/add', component: PhotoFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] //necessario exportar este modulo para podermos usar o router-outlet
})
export class AppRoutingModule { }
