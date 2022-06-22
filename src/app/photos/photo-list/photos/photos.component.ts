import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['photos']){ //caso haja alteracao nos valores do input, a propriedade changes ira conter o nome da propriedade que sofreu alteracao
      this.rows = this.groupColumns(this.photos);
    }
  }

  ngOnInit(): void {
  }

  groupColumns(photos: Photo[]){
    const newRows: any[] = [];

    for(let index = 0; index < photos.length; index +=3){
      newRows.push(photos.slice(index, index + 3))
    }
    return newRows;
  }

}
