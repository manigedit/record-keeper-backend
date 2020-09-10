import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodsDataSource} from '../datasources';
import {Entry, EntryRelations} from '../models';

export class EntryRepository extends DefaultCrudRepository<
  Entry,
  typeof Entry.prototype._id,
  EntryRelations
> {
  constructor(@inject('datasources.mongods') dataSource: MongodsDataSource) {
    super(Entry, dataSource);
  }
}
