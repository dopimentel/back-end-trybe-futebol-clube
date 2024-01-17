// import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import CRUDModel from './CRUDModel';
import { IMatch, Leaderboard, LeaderboardAccumulator } from '../Interfaces/IEntities';
import { ICRUDModel } from '../Interfaces/ICRUDModel';

export default class ModelLeaderboard <T> extends CRUDModel<SequelizeTeam> {
  constructor(protected modelReader: ICRUDModel<T>) {
    super(SequelizeTeam);
  }

  public async getLeaderboard(): Promise<Leaderboard[]> {
    const teams = await super.findAll();
    const leadboards = await Promise.all(teams.map((team) => this.calculateLeadboardForTeam(team)));
    return ModelLeaderboard.sortLeadboards(leadboards);
  }

  async calculateLeadboardForTeam(team: SequelizeTeam): Promise<Leaderboard> {
    const matches = await this.getMatchesForTeam(team);
    const accumulator = ModelLeaderboard.calculateAccumulator(matches as unknown as IMatch[]);

    return {
      name: team.teamName,
      totalPoints: accumulator.totalPoints,
      totalGames: matches.length,
      totalVictories: accumulator.totalVictories,
      totalDraws: accumulator.totalDraws,
      totalLosses: accumulator.totalLosses,
      goalsFavor: accumulator.goalsFavor,
      goalsOwn: accumulator.goalsOwn,
      goalsBalance: accumulator.goalsBalance,
      efficiency: ModelLeaderboard.calculateEfficiency(accumulator.totalPoints, matches.length),
    };
  }

  async getMatchesForTeam(team: SequelizeTeam): Promise<T[]> {
    return this.modelReader.findAll({
      where: {
        homeTeamId: team.id,
        inProgress: false,
      },
    });
  }

  static calculateAccumulator(matches: IMatch[]): LeaderboardAccumulator {
    return matches.reduce((acc, cur) => {
      const { homeTeamGoals, awayTeamGoals } = cur as IMatch;
      acc.goalsFavor += homeTeamGoals;
      acc.goalsOwn += awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      this.updateAccumulatorBasedOnResult(cur, acc);
      return acc;
    }, this.getInitialAccumulator());
  }

  static updateAccumulatorBasedOnResult(match: IMatch, acc: LeaderboardAccumulator): void {
    const { homeTeamGoals, awayTeamGoals } = match as IMatch;
    if (homeTeamGoals > awayTeamGoals) {
      acc.totalVictories += 1;
      acc.totalPoints += 3;
    } else if (homeTeamGoals === awayTeamGoals) {
      acc.totalDraws += 1;
      acc.totalPoints += 1;
    } else {
      acc.totalLosses += 1;
    }
  }

  static calculateEfficiency(totalPoints: number, totalGames: number): number {
    return parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static getInitialAccumulator(): LeaderboardAccumulator {
    return {
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      totalVictories: 0,
      totalPoints: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
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

// const modelLeaderboard = new ModelLeaderboard<SequelizeMatch>(new CRUDModel(SequelizeMatch));
// modelLeaderboard.getLeaderboard().then((result) => {
//   console.log(result);
// });
