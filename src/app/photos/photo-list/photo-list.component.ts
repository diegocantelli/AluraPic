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
  currentPage: number = 1;
  userName: string = '';
  hasMore: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService){}

  //Ocorre apos a instanciacao da classe e de receber as inboud properties
  ngOnInit(): void{

    // escutando alterações na rota para que os dados sejam atualizados conforme os parâmetros mudarem na rota
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
      this.photos = this.activatedRoute.snapshot.data['photos'];
    });
   }

  load(){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        //é necessario atribuir uma nova instancia a photos para que o mecanismo de deteccao do angular saiba que essa propriedade mudou
        //e assim o template possa ser renderizado com os novos valores
        this.photos = this.photos.concat(photos);
        if(!photos.length) this.hasMore = false
      })
  }
}

