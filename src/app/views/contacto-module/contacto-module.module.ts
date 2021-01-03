import { MisRoutes } from './contacto-module-routes.module.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ListaContactosComponent } from './lista-contactos/lista-contactos.component';
import { CrearEditarContactoComponent } from './crear-editar-contacto/crear-editar-contacto.component';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  imports: [
    RouterModule.forChild(MisRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,

    ModalModule.forRoot()
  ],
  declarations: [
    ListaContactosComponent,
    CrearEditarContactoComponent,
    PrincipalComponent],
  providers: [

  ],
})
export class ContactoModule { }
