import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.Id,
  SolicitudRelations
> {

  public readonly cliente: BelongsToAccessor<Usuario, typeof Solicitud.prototype.Id>;

  public readonly asesor: BelongsToAccessor<Usuario, typeof Solicitud.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Solicitud, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', usuarioRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', usuarioRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
