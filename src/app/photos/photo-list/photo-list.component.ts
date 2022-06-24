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

  constructor(private activatedRoute: ActivatedRoute){}

  //Ocorre apos a instanciacao da classe e de receber as inboud properties
  ngOnInit(): void{
    this.photos = this.activatedRoute.snapshot.data['photos'];

    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //necessario se desinscrever desta observable para nao continuar alocando memoria desnecessario
  }
}

