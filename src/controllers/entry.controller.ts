import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Entry} from '../models';
import {EntryRepository, UserRepository} from '../repositories';

export class EntryController {
  constructor(
    @repository(EntryRepository)
    public entryRepository: EntryRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  @post('/entries', {
    responses: {
      '200': {
        description: 'Entry model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entry)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entry, {
            title: 'NewEntry',
          }),
        },
      },
    })
    entry: Entry,
  ): Promise<Entry> {
    // error suppressed to alow use of MongoDB extended operators
    // @ts-ignore
    await this.userRepository.updateById(entry.userId, {$inc: {entrycount: 1}});
    return this.entryRepository.create(entry);
  }

  @get('/entries', {
    responses: {
      '200': {
        description: 'Array of Entry model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Entry, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Entry) filter?: Filter<Entry>): Promise<Entry[]> {
    return this.entryRepository.find(filter);
  }

  @get('/entries/{id}', {
    responses: {
      '200': {
        description: 'Entry model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Entry, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Entry, {exclude: 'where'})
    filter?: FilterExcludingWhere<Entry>,
  ): Promise<Entry> {
    return this.entryRepository.findById(id, filter);
  }
}
