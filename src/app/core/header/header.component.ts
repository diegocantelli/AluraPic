import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/user/user";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

  user$: Observable<User | null>;

  constructor(userService: UserService){
    this.user$ = userService.getUser();
  }
}
