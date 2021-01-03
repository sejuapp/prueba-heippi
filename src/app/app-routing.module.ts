import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./views/contacto-module/contacto-module.module').then(m => m.ContactoModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./views/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**', redirectTo: '/error/404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
