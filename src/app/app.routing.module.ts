import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/guards/auth.guard';
import { RequiresAuthenticationGuard } from './core/guards/requires.authentication.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
    },
    {
      path: 'user/:userName',
      component: PhotoListComponent,
      resolve: {
        photos: PhotoListResolver
      },
      data: {
        title: 'Timeline'
      }
    },
    {
      path: 'p/add',
      component: PhotoFormComponent,
      canActivate: [ RequiresAuthenticationGuard ],
      data: {
        title: 'Photo upload'
      }
    },
    {
      path: 'p/:photoId',
      component: PhotoDetailsComponent,
      data: {
        title: 'Photo Detail'
      }
    },
    {
      path: 'error',
      component: GlobalErrorComponent,
      data: {
        title: 'error'
      }
    },
    {
      path: 'not-found',
      component: NotFoundComponent,
      data: {
        title: 'Not found'
      }
    },
    { path: '**', redirectTo: 'not-found' }, //caso o usuario digite uma rota invalida sera carregado o componente de NotFoundComponent
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],

  //useHash: true -> adiciona o hash na url da aplicacao
  // imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [ RouterModule ] //necessario exportar este modulo para podermos usar o router-outlet
})
export class AppRoutingModule { }
