import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ServiceLeaderboard from '../services/ServiceLeaderboard';

export default class ControllerLeaderboard {
  constructor(
    private serviceLeaderboard: ServiceLeaderboard,
    protected whereKey?: string,
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.serviceLeaderboard.getLeaderboard(this.whereKey);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getGlobalLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.serviceLeaderboard.getGlobalLeaderboard();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
