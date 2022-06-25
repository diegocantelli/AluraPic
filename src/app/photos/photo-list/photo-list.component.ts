import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy{

  photos: Photo[] = [];
  filter: any  = '';
  debounce: Subject<string> = new Subject<string>();
  currentPage: number = 1;
  userName: string = '';
  hasMore: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService){}

  //Ocorre apos a instanciacao da classe e de receber as inboud properties
  ngOnInit(): void{
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];

    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }

  load(){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        //é necessario atribuir uma nova instancia a photos para que o mecanismo de deteccao do angular saiba que essa propriedade mudou
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false
      })
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //necessario se desinscrever desta observable para nao continuar alocando memoria desnecessario
  }
}

