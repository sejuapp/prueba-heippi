import { HelpersService } from './../../../services/helper/helpers.service';

import { MensajeService } from './../../../services/mensajes/mensaje.service';
import { LocalStrorageService } from './../../../services/localStorage/local-strorage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoModel } from 'src/app/models/contactoModel';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-editar-contacto',
  templateUrl: './crear-editar-contacto.component.html',
  styleUrls: ['./crear-editar-contacto.component.scss']
})
export class CrearEditarContactoComponent implements OnInit {
  @Output() public emiter = new EventEmitter();
  @Input() item = null;

  respuestaComponent = {
    estado: 'ok',
    btn_cancelar: false,
    data: null
  }

  contactoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private srvMensaje: MensajeService,
    private srvLocalStorage: LocalStrorageService,
    private srvHelpers: HelpersService,
  ) { }

  ngOnInit(): void {
    this.inicializarFormularios();
    this.cargarInformacionFormulario();
  }


  /**
   * Metodo para la configuración inicial de los formularios
   */
  inicializarFormularios() {
    this.contactoForm = this.fb.group({
      id: new FormControl(null),
      num_identificacion: new FormControl(null, [Validators.required]),
      nombre_completo: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required]),
      fecha_nacimiento: new FormControl(null, [Validators.required]),
    });

  }


  cargarInformacionFormulario() {
    if (this.item != null) {
      this.contactoForm.patchValue(this.item);

      const fecha = moment(this.item.fecha_nacimiento).toDate();
      this.contactoForm.get('fecha_nacimiento').setValue(fecha);

    }
  }

  /**
   * Metodo para retornar controls de formulario contactoForm para las validaciones del formulario
   * reduce llamada de codigo en la vista
   */
  get f() { return this.contactoForm.controls; }


  confirmarGuardado() {

    if (this.contactoForm.valid) {
      this.srvMensaje.mensajeConfimacion('Confirmar',
        '¿Confirma que desea guardar el contacto?', 'q').then(res => {
          if (res) {
            this.guardar();
          }
        })
    }
  }

  guardar() {
    debugger
    let emitir = false;
    const datosContacto: ContactoModel = this.contactoForm.getRawValue();
    datosContacto.num_identificacion = this.srvHelpers.quitarTodosLosEspacios(datosContacto.num_identificacion);

    datosContacto.fecha_nacimiento = this.srvHelpers.formatearFecha(datosContacto.fecha_nacimiento, { anioPrimero: true, separador: '-' });

    const misContactos: Array<ContactoModel> = this.srvLocalStorage.darListaContactos();
    const encontrado = misContactos.find(mif => datosContacto.num_identificacion == mif.num_identificacion);
    if (this.item == null) {

      if (!encontrado) {
        emitir = true;
      } else {
        this.srvMensaje.enviarMensaje('No se agrego el contacto', 'Lo sentimos, ya existe un contacto con el número de identificación digitado.', 'w');
      }

    } else {

      if (!encontrado) {
        emitir = true;
      } else {
        if (encontrado.id == datosContacto.id) {
          emitir = true;
        } else {
          this.srvMensaje.enviarMensaje('No se edito el contacto', 'Lo sentimos, ya existe un contacto con el número de identificación digitado.', 'w');
        }
      }

    }

    if (emitir) {
      this.srvLocalStorage.agregarActualizarContacto(datosContacto);
      this.respuestaComponent.data = datosContacto;
      this.srvMensaje.enviarMensaje('', `${this.item == null ? 'Contacto agregado correctamente' : 'Contacto editado correctamente'}`, 's');
      this.emiter.emit(this.respuestaComponent);
    }

  }

  cancelar() {
    this.contactoForm.reset();
    this.respuestaComponent.btn_cancelar = true;
    this.emiter.emit(this.respuestaComponent);
  }

}
