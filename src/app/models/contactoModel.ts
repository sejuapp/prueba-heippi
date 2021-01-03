export class ContactoModel {

  id: string;
  num_identificacion: string;
  nombre_completo: string;
  direccion: string;
  celular: string;
  fecha_nacimiento: string;

  constructor(id = null,
    num_identificacion = null, nombre_completo = null,
    direccion = null, celular = null, fecha_nacimiento = null) {

    this.id = id;
    this.num_identificacion = num_identificacion;
    this.nombre_completo = nombre_completo;
    this.direccion = direccion;
    this.celular = celular;
    this.fecha_nacimiento = fecha_nacimiento;
  }
}
