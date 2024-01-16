import { Request, Response } from 'express';
import { Attributes, FindOptions, Model } from 'sequelize';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceReader from '../services/ServiceReader';

export default class ReaderController<T extends Model> {
  constructor(
    private serviceReader: ServiceReader<T>,
    protected options?: FindOptions<Attributes<T>> | undefined,
  ) { }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.serviceReader
      .getAll(this.options);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.serviceReader.getById(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
