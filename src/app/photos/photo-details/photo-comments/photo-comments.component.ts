import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html'
})

export class PhotoCommentsComponent implements OnInit {

  @Input() photoId!: number;
  commentForm!: FormGroup;

  comments$ = new Observable<PhotoComment[]>();

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    })
  }

  checkFormFieldErrosValidation(errorsArray: ValidationErrors | null | undefined, error: string): boolean{
    if(!errorsArray) return false;

    if(!errorsArray[error]) return false;

    return true;
  }

}
