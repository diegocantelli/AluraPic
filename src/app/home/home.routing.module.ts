import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [ //rotas filhas do componente home
        {
          path: '',
          component: SignInComponent,
          data: {
            title: 'Sign In'
          }
        },
        {
          path: 'signup',
          component: SignUpComponent,
          data: {
            title: 'Sign Up'
          }
        },
      ]
    },
  ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],

  //useHash: true -> adiciona o hash na url da aplicacao
  // imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [ RouterModule ] //necessario exportar este modulo para podermos usar o router-outlet
})
export class HomeRoutingModule { }
