import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { LoadingType } from "./loading-type";
import { LoadingService } from "./loading.service";

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit{

  loading$!: Observable<string>;

  constructor(private loadingService: LoadingService){}

  ngOnInit(): void {

    //conforme o valor que for passado pelo interceptor será retornada uma classe css
    this.loading$ = this.loadingService.getLoading()
    .pipe(map(loadingType => loadingType.valueOf()));
  }
}
