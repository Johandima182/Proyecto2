import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Solicitud,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioSolicitudController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.usuarioRepository.solicidudCliente(id).find(filter);
  }

  @post('/usuarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInUsuario',
            exclude: ['Id'],
            optional: ['id_Cliente']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'Id'>,
  ): Promise<Solicitud> {
    return this.usuarioRepository.solicidudCliente(id).create(solicitud);
  }

  @patch('/usuarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.solicidudCliente(id).patch(solicitud, where);
  }

  @del('/usuarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Usuario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.usuarioRepository.solicidudCliente(id).delete(where);
  }
}
