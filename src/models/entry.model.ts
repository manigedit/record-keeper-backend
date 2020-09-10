import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Entry extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  path?: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @belongsTo(() => User)
  userId: string;

  @property({
    type: 'date',
    required: true,
  })
  timestamp: string;

  constructor(data?: Partial<Entry>) {
    super(data);
  }
}

export interface EntryRelations {
  // describe navigational properties here
}

export type EntryWithRelations = Entry & EntryRelations;
