import { Attributes, FindOptions, Model } from 'sequelize';
// import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import ModelReader from '../models/CRUDModel';
import { ID } from '../Interfaces/ICRUDModel';

export default class ReaderService<T extends Model> {
  constructor(
    protected modelReader: ModelReader<T>,
    protected item: string = 'Item',
  ) {}

  public async getAll(
    options?: FindOptions<Attributes<T>> | undefined,
  ): Promise<ServiceResponse<T[]>> {
    const data = await this.modelReader.findAll(options);
    return { status: 'SUCCESSFUL', data };
  }

  public async getById(id: ID): Promise<ServiceResponse<T>> {
    const data = await this.modelReader.findById(id);
    if (!data) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data } as ServiceResponse<T>;
  }

  public async finishMatch(id: ID): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.modelReader.findById(id);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    await this.modelReader.update(id, { inProgress: false });

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: ID,
    data: Partial<Attributes<T>>,
  ): Promise<ServiceResponse<T>> {
    const item = await this.modelReader.findById(id);
    if (!item) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    const updated = await this.modelReader.update(id, data);
    if (!updated) {
      return {
        status: 'NOT_FOUND',
        data: { message: `${this.item} with id ${id} not found` },
      };
    }
    return { status: 'SUCCESSFUL', data: updated } as ServiceResponse<T>;
  }

  public async createMatch(data: Partial<T>): Promise<ServiceResponse<T>> {
    try {
      const match = {
        ...data,
        inProgress: true,
      };
      const created = await this.modelReader.create(match as unknown as T);
      return { status: 'CREATED', data: created } as ServiceResponse<T>;
    } catch (err) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
  }
}

// const readerService = new ReaderService(new ModelReader(SequelizeTeam));
// readerService.getAll().then((teams) => {
//   console.log(teams);
// });
