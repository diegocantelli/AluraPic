import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { VMessageComponent } from "src/app/shared/components/vmessage/vmessage.component";
import { VMessageModule } from "src/app/shared/components/vmessage/vmessage.module";
import { PhotoFormComponent } from "./photo-form.component";

@NgModule({
  declarations: [PhotoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VMessageModule,
    FormsModule]
})
export class PhotoFormModule{}
