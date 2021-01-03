import { LocalStrorageService } from './../../../services/localStorage/local-strorage.service';
import { MensajeService } from './../../../services/mensajes/mensaje.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ContactoModel } from 'src/app/models/contactoModel';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.scss']
})
export class ListaContactosComponent implements OnInit {
  modalRef: BsModalRef;

  lstContactos: Array<ContactoModel> = [];


  itemSeleccionado = null;

  constructor(
    private srvMensaje: MensajeService,
    private modalService: BsModalService,
    private srvLocalStorage: LocalStrorageService
  ) { }

  ngOnInit(): void {
    this.cargarListaDeContactos();
  }

  cargarListaDeContactos() {
    this.lstContactos = this.srvLocalStorage.darListaContactos();
  }


  openModal(template: TemplateRef<any>, item) {
    this.itemSeleccionado = item;
    this.modalRef = this.modalService.show(template, { keyboard: true, ignoreBackdropClick: true });
  }

  eliminarContacto(item) {
    this.srvMensaje.mensajeConfimacion('Confirmar',
      '¿Confirma que desea eliminar el contacto?', 'q').then(res => {
        if (res) {
          this.srvLocalStorage.eliminarContacto(item);
          this.cargarListaDeContactos();
        }
      })
  }

  emiterCrearEditar(event) {
    try {
      if (event.btn_cancelar == true) {
        this.modalRef.hide();
      } else if (event.estado == 'ok') {
        this.cargarListaDeContactos();
        this.modalRef.hide();
      }
    } catch (error) {
      this.srvMensaje.mensajeErrorServidor(error);
    }
  }

}
