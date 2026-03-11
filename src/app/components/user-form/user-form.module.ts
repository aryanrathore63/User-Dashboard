import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserFormComponent }
    ])
  ]
})
export class UserFormModule { }