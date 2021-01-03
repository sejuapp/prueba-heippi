import { HelpersService } from './../helper/helpers.service';
import { ContactoModel } from './../../models/contactoModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStrorageService {

  llave = 'misContactos';

  constructor(
    private srvHelpers: HelpersService,
  ) { }

  darListaContactos() {
    let lst = localStorage.getItem(this.llave) as any;
    if (lst != null) {
      lst = JSON.parse(lst);
    } else {
      lst = [];
    }

    return lst;
  }

  /**
   * Ingresa a la lista del local storage un nuevo contacto
   * @param nContacto nuevo contacto a agregar
   */
  agregarActualizarContacto(nContacto: ContactoModel) {
    const misContactos: Array<ContactoModel> = this.darListaContactos();

    const encontrado = misContactos.find(mif => nContacto.id == mif.id);
    if (!encontrado) {
      let r = Math.random().toString(36).substr(2, 10);
      nContacto.id = r;
      misContactos.push(nContacto);
    } else {
      this.srvHelpers.setearDatos(encontrado, nContacto);
    }

    const cadena = JSON.stringify(misContactos);
    localStorage.setItem(this.llave, cadena);

    return nContacto;
  }

  eliminarContacto(contacto) {
    const misContactos: Array<ContactoModel> = this.darListaContactos();

    const indice = misContactos.findIndex(mif => contacto.id == mif.id);
    misContactos.splice(indice, 1);

    const cadena = JSON.stringify(misContactos);
    localStorage.setItem(this.llave, cadena);
  }
}
