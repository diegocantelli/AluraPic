import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { UserService } from "src/app/user/user.service";

import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { PhotoService } from "../photo/photo.service";

@Component({
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.css']
})
export class PhotoDetailsComponent implements OnInit{

  photo$ = new Observable<Photo>;
  photoId!: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService){}

  ngOnInit(): void {

    this.photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe({
      next: () => {},
      error: err => { //caso o id da foto nao exista, dara erro 404 e sera redirecionado para a pagina de notfound
        console.log(err);
        this.router.navigate(['not-found']);
      }
    })
  }

  remove(){
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(() => {
        this.alertService.success('Foto removida com sucesso!', true);
        this.router.navigate(['/user', this.userService.getUserName()])
      });
  }

  like(photo: Photo){
    this.photoService
      .like(photo.id)
      .subscribe(liked => {
        if(liked){
          //busca os dados da foto atualizados com o número de likes
          this.photo$ = this.photoService.findById(photo.id);
        }
      })
  }
}
