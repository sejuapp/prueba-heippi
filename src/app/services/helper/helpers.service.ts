import { Injectable } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  constructor() {
  }

  setearDatos(objeto, comparador, lstNumeros = [], lstFechas = []) {
    if (objeto != null && comparador != null) {
      for (let item1 in objeto) {
        for (let item2 in comparador) {
          if (item1 == item2) {
            if (comparador[item2] != null && comparador[item2] != '') {
              objeto[item1] = comparador[item2] + '';
              break;
            }
          }
        }
      }

      if (lstNumeros != null && lstNumeros != []) {
        for (let numero in lstNumeros) {
          for (let item in objeto) {
            if (item == lstNumeros[numero]) {
              objeto[item] = (objeto[item] != null && objeto[item] != '') ? parseInt(objeto[item]) : null;
              break;
            }
          }
        }
      }

      if (lstFechas != null && lstFechas != []) {
        for (let fecha in lstFechas) {
          for (let item in objeto) {
            if (item == lstFechas[fecha]) {
              objeto[item] = (objeto[item] != null && objeto[item] != '') ? new Date(objeto[item]) : null;
              break;
            }
          }
        }
      }
    }
  }


  setearDatosOriginales(objeto, comparador) {
    if (objeto != null && comparador != null) {
      for (let item1 in objeto) {
        for (let item2 in comparador) {
          if (item1 == item2) {
            objeto[item1] = comparador[item2];
            break;
          }
        }
      }
    }

  }


  quitarExcesoEspacios(data) {
    if (data != null) {
      if (typeof data === 'string') {
        return data.replace(/ +/g, ' ').trim();
      } else if (typeof data === 'object') {

        // tslint:disable-next-line: forin
        for (const item in data) {
          const valor = data[item];
          if (typeof valor === 'string') {
            const nValor = valor.replace(/ +/g, ' ').trim();
            data[item] = nValor;
          }
        }


      }
    }

    return data;

  }


  quitarTodosLosEspacios(data) {
    if (data != null) {
      if (typeof data === 'string') {
        return data.replace(/ /g, "").trim();
      } else if (typeof data === 'object') {

        for (let item in data) {
          const valor = data[item];
          if (typeof valor === 'string') {
            const nValor = valor.replace(/ /g, "").trim();
            data[item] = nValor;
          }
        }

        return data;
      }
    } else {
      return null;
    }
  }


  /**
 *
 * @param fechaparam fecha a procesar
 * @param opciones opciones para el formato de fechas
 * @example { hora: false, separador: '/', anioPrimero: false }
 */
  formatearFecha(fechaparam, opciones = null) {
    if (fechaparam) {
      let fecha = new Date(fechaparam);

      let separador = opciones != null && opciones.separador != null ? opciones.separador : '/';
      let hora = opciones != null && opciones.hora != null ? opciones.hora : false;
      let anioPrimero = opciones != null && opciones.anioPrimero != null ? opciones.anioPrimero : false;

      var cadena = ""

      let mes = this.padnum(fecha.getMonth() + 1, 2);
      let dia = this.padnum(fecha.getDate(), 2);
      let hora_formateada = this.padnum(fecha.getHours(), 2);
      let minuto = this.padnum(fecha.getMinutes(), 2);

      if (anioPrimero) {
        cadena = [fecha.getFullYear(), mes, dia].join(separador);
      } else {
        cadena = [dia, mes, fecha.getFullYear()].join(separador);
      }

      if (hora) {
        cadena = cadena + " " + hora_formateada + ":" + minuto;
      }


      return cadena;
    }
    else {
      return null;
    }
  }



  padnum(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s
    }
    return s;
  }


}


