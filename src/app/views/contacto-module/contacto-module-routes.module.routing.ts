import { PrincipalComponent } from './principal/principal.component';
import { ListaContactosComponent } from './lista-contactos/lista-contactos.component';
import { Routes } from '@angular/router';

export const MisRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PrincipalComponent,
      },
      {
        path: 'lista-contactos',
        component: ListaContactosComponent,
      }
    ]
  }
];
