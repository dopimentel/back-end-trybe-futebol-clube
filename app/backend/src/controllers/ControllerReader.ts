import { Request, Response } from 'express';
import { Attributes, FindOptions, Model, WhereOptions } from 'sequelize';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceReader from '../services/ServiceReader';

export default class ReaderController<T extends Model> {
  constructor(
    private serviceReader: ServiceReader<T>,
    protected options?: FindOptions<Attributes<T>> | undefined,
  ) { }

  public async getAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const filter = {
        ...this.options,
        where: { inProgress: inProgress === 'true' } as unknown as WhereOptions<Attributes<T>>,
      };
      const serviceResponse = await this.serviceReader
        .getAll(filter);

      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
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

// if (req.query.inProgress) {
//       console.log(req.query.inProgress);
//       console.log(req.query.inProgress === 'true');
//       const { inProgress } = req.query;
//       this.options = {
//         where: { inProgress: inProgress === 'true' } as unknown as WhereOptions<Attributes<T>>,
//       };
//   const serviceResponse = await this.serviceReader
//     .getAll(this.options);

//   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
// }
