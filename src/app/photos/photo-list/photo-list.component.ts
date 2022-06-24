import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit{

  photos: Photo[] = [];
  filter: any  = '';

  constructor(private activatedRoute: ActivatedRoute){}

  //Ocorre apos a instanciacao da classe e de receber as inboud properties
  ngOnInit(): void{
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

}

