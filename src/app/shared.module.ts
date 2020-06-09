//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrComponent } from './shared/components/err/err.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
  declarations: [ErrComponent,
    PaginationComponent,
    NotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],exports:[
    //modules
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    //components
    ErrComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
