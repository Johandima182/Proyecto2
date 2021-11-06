import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoDoc: string;

  @property({
    type: 'string',
    required: true,
  })
  NumDoc: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Ciudad: string;

  @property({
    type: 'string',
  })
  Estado?: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoUsuario: string;

  @hasMany(() => Solicitud, {keyTo: 'id_Cliente'})
  solicidudCliente: Solicitud[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
