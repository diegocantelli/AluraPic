import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/user/user.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm!: FormGroup;
  file!: File | null;
  preview!: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });

    console.log(!!this.percentDone)
  }

  upload(): void {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;

    if(!this.file)
      return;

    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe((event: HttpEvent<any>) => {

        if(event.type == HttpEventType.UploadProgress){
          if(event && event.total && event.loaded){
            this.percentDone = Math.round(100 * event.loaded / event.total);
          }
        } else if (event.type == HttpEventType.Response){ //finalizou o processo de upload
          this.percentDone = 0;
          this.alertService.success('Upload complete');
          this.router.navigate([''])
        }

      },
      err => {
        console.log(err);
        this.alertService.danger('Upload Error!');
        this.router.navigate(['/user', this.userService.getUserName()]);
      });


  }

  chooseFile(event: Event){
    const inputFile = (event.target as HTMLInputElement)
    if(!inputFile.files) return;

    this.file = inputFile?.files[0];

    const reader = new FileReader();

    //este callback será chamado após o método readAsDataURL finalizar a conversao do arquivo para base64
    //precisa ser chamado antes de readAsDataURL para o método ter uma referência do que deve ser feito após o término de sua execução
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(this.file);
  }

}
