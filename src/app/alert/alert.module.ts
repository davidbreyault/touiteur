import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [AlertComponent]
})
export class AlertModule { }