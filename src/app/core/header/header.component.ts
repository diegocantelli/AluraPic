import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/user/user";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

  user$: Observable<User | null>;

  constructor(
    private userService: UserService,
    private router: Router
    ){
    this.user$ = userService.getUser();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }
}
