import { ContactoModel } from 'src/app/models/contactoModel';
import { LocalStrorageService } from './../../../services/localStorage/local-strorage.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  lstContactos: Array<ContactoModel> = [];
  totalHoy = 0;


  constructor(
    private srvLocalStorage: LocalStrorageService
  ) { }

  ngOnInit(): void {
    this.cargarListaDeContactos();
  }

  cargarListaDeContactos() {
    this.lstContactos = this.srvLocalStorage.darListaContactos();
    const hoy = new Date();

    this.totalHoy = 0;

    for (const item of this.lstContactos) {
      let fecha = item.fecha_nacimiento as any;
      if (fecha) {

        fecha = moment(fecha).toDate();
        const anio = fecha.getMonth();
        const dia = fecha.getDate();
        const cadena = `${anio}${dia}`;

        const anioHoy = hoy.getMonth();
        const diaHoy = hoy.getDate();
        const cadenaHoy = `${anioHoy}${diaHoy}`;

        if (cadena == cadenaHoy) {
          this.totalHoy = this.totalHoy + 1;
        }
      }


    }

  }
}
