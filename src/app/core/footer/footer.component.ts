import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/user/user";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {

  user$!: Observable<User | null>;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }

}
