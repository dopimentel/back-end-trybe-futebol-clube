import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModelLeaderboard from '../models/ModelLeaderboard';
import { Leaderboard } from '../Interfaces/IEntities';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class ServiceLeaderboard {
  constructor(protected model: ModelLeaderboard<SequelizeMatch>) {
  }

  public async getGlobalLeaderboard(): Promise<ServiceResponse<Leaderboard[]>> {
    const leaderboard = await this.model.getGlobalLeaderboard();
    return { status: 'SUCCESSFUL', data: ServiceLeaderboard.sortLeadboards(leaderboard) };
  }

  public async getLeaderboard(whereKey?: string): Promise<ServiceResponse<Leaderboard[]>> {
    const leaderboard = await this.model.getLeaderboard(whereKey);
    return { status: 'SUCCESSFUL', data: ServiceLeaderboard.sortLeadboards(leaderboard) };
  }

  static sortLeadboards(leadboards: Leaderboard[]): Leaderboard[] {
    return leadboards.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  }
}
