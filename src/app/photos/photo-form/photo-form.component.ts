import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm!: FormGroup;
  file!: File | null;

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(description);
    console.log(allowComments);
    console.log(this.file);
  }

  chooseFile(event: Event){
    const inputFile = (event.target as HTMLInputElement)
    if(!inputFile.files) return;

    this.file = inputFile?.files[0]
  }

}
