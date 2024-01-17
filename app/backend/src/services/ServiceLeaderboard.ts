import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModelLeaderboard from '../models/ModelLeaderboard';
import { Leaderboard } from '../Interfaces/IEntities';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class ServiceLeaderboard {
  constructor(protected model: ModelLeaderboard<SequelizeMatch>) {
  }

  public async getLeaderboard(): Promise<ServiceResponse<Leaderboard[]>> {
    const leaderboard = await this.model.getLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
