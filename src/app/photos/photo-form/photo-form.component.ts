import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload(): void {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;

    if(!this.file)
      return;

    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => {
        this.alertService.success('Upload complete');
        this.router.navigate([''])
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
