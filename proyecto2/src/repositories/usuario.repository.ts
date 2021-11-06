import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.Id,
  UsuarioRelations
> {

  public readonly solicidudCliente: HasManyRepositoryFactory<Solicitud, typeof Usuario.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Usuario, dataSource);
    this.solicidudCliente = this.createHasManyRepositoryFactoryFor('solicidudCliente', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicidudCliente', this.solicidudCliente.inclusionResolver);
  }
}
