import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


const materialComponent: any = [MatIconModule, FormsModule,MatDialogModule];
@NgModule({
  exports: [materialComponent],
  imports: [materialComponent],
})
export class MaterialModule { }
