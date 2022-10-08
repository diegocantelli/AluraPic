import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Photo } from './photos/photo/photo';
import { PhotoService } from './photos/photo/photo.service';
import { PhotosModule } from './photos/photos.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        // http://localhost:4200/user/flavio
        // 1 iteracao: http://localhost:4200 -> neste exemplo terá a url de rota definida como ""
        //             e irá possuir o firstChild como user/flavio, que na vdd e a representacao da rota definida como user/:user
        // 2 iteracao: irá ter como valores nos segmentos de rota os valores user e flavio
        //             e irá possuir valor null na propriedade firstChild. Nesta rota que terá o valor passado na propriedade data
        while(route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(event => this.titleService.setTitle(event['title']))
  }
}
