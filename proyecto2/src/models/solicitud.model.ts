import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Solicitud extends Entity {
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
  Estado: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  NumDias: number;

  @property({
    type: 'number',
    required: true,
  })
  ValorTotal: number;

  @property({
    type: 'number',
    required: true,
  })
  ValorDia: number;
  @property({
    type: 'string',
    required: true,
  })
  id_Vehiculo: string;

  @belongsTo(() => Usuario, {name: 'cliente'})
  id_Cliente: string;

  @belongsTo(() => Usuario, {name: 'asesor'})
  id_Asesor: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
