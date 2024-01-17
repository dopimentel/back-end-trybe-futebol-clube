import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceLeaderboard from '../services/ServiceLeaderboard';

export default class ControllerLeaderboard {
  constructor(
    private serviceLeaderboard: ServiceLeaderboard,
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.serviceLeaderboard.getLeaderboard();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
