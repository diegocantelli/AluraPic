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

  loading$: Observable<string>;

  constructor(private loadingService: LoadingService){
    this.loading$ = new Observable<string>();
  }

  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading()
    .pipe(map(loadingType => loadingType.valueOf()));
  }

  getLoadingClass() : string {
    let classe = '';

    this.loadingService.getLoading()
      .pipe(map(loadingType => loadingType.valueOf()))
      .subscribe(value => classe = value);

    return classe ?? 'stopped';
  }

}
