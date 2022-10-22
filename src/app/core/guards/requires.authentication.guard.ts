import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({ providedIn: 'root' })
export class RequiresAuthenticationGuard implements CanActivate{

  constructor(
    private userService: UserService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    //true: acesso à rota

    if(!this.userService.isLogged()){
      this.router.navigate([''],
      {
        queryParams: {
          formUrl: state.url
        }
      });
      return false;
    }
    // this.router.navigate(['']);
    return true;
  }

}
