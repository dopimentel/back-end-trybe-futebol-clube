import { Op } from 'sequelize';
import SequelizeTeam from '../database/models/SequelizeTeam';
import CRUDModel from './CRUDModel';
import { IMatch, Leaderboard, LeaderboardAccumulator } from '../Interfaces/IEntities';
import { ICRUDModel } from '../Interfaces/ICRUDModel';

export default class ModelLeaderboard <T> extends CRUDModel<SequelizeTeam> {
  constructor(protected modelReader: ICRUDModel<T>) {
    super(SequelizeTeam);
  }

  public async getGlobalLeaderboard(): Promise<Leaderboard[]> {
    const home = await this.getLeaderboard('homeTeamId');
    const away = await this.getLeaderboard('awayTeamId');
    return ModelLeaderboard.mergeLeaderboards(home, away);
  }

  static mergeLeaderboards(home: Leaderboard[], away: Leaderboard[]): Leaderboard[] {
    const leaderboardMap = new Map<string, Leaderboard>(
      home.map((leaderboard) => [leaderboard.name, leaderboard]),
    );

    return away.map((leaderboard) => {
      const existingLeaderboard = leaderboardMap.get(leaderboard.name);

      if (existingLeaderboard) {
        return {
          name: leaderboard.name,
          ...ModelLeaderboard.combineProperties(existingLeaderboard, leaderboard),
          efficiency: ModelLeaderboard.calculateEfficiency(
            existingLeaderboard.totalPoints + leaderboard.totalPoints,
            existingLeaderboard.totalGames + leaderboard.totalGames,
          ),
        };
      }

      return leaderboard;
    }) as Leaderboard[];
  }

  private static combineProperties(
    existingLeaderboard: Leaderboard,
    leaderboard: Leaderboard,
  ): Partial<Leaderboard> {
    return {
      totalPoints: existingLeaderboard.totalPoints + leaderboard.totalPoints,
      totalGames: existingLeaderboard.totalGames + leaderboard.totalGames,
      totalVictories: existingLeaderboard.totalVictories + leaderboard.totalVictories,
      totalDraws: existingLeaderboard.totalDraws + leaderboard.totalDraws,
      totalLosses: existingLeaderboard.totalLosses + leaderboard.totalLosses,
      goalsFavor: existingLeaderboard.goalsFavor + leaderboard.goalsFavor,
      goalsOwn: existingLeaderboard.goalsOwn + leaderboard.goalsOwn,
      goalsBalance: existingLeaderboard.goalsBalance + leaderboard.goalsBalance,
    };
  }

  public async getLeaderboard(whereKey?: string): Promise<Leaderboard[]> {
    const teams = await super.findAll();
    const leadboards = await Promise.all(teams.map((team) => this
      .calculateLeadboardForTeam(team, whereKey)));
    return leadboards;
  }

  async calculateLeadboardForTeam(team: SequelizeTeam, whereKey?: string): Promise<Leaderboard> {
    const matches = await this.getMatchesForTeam(team, whereKey);
    const accumulator = ModelLeaderboard
      .calculateAccumulator(matches as unknown as IMatch[], whereKey as string);

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

  async getMatchesForTeam(team: SequelizeTeam, whereKey?: string): Promise<T[]> {
    if (!whereKey) {
      return this.modelReader.findAll(
        { where: { inProgress: false,
          [Op.or]: [
            { homeTeamId: team.id },
            { awayTeamId: team.id }],
        } },
      );
    }
    return this.modelReader.findAll({
      where: {
        [whereKey as string]: team.id,
        inProgress: false,
      },
    });
  }

  static calculateAccumulator(matches: IMatch[], whereKey: string): LeaderboardAccumulator {
    return matches.reduce((acc, cur) => {
      const { homeTeamGoals, awayTeamGoals } = cur as IMatch;
      const isHomeTeam = whereKey === 'homeTeamId';

      acc.goalsFavor += isHomeTeam ? homeTeamGoals : awayTeamGoals;
      acc.goalsOwn += isHomeTeam ? awayTeamGoals : homeTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      this.updateAccumulatorBasedOnResult(cur, acc, whereKey);
      return acc;
    }, this.getInitialAccumulator());
  }

  static updateAccumulatorBasedOnResult(
    match: IMatch,
    acc: LeaderboardAccumulator,
    whereKey: string,
  ): void {
    const { homeTeamGoals, awayTeamGoals } = match as IMatch;
    const isHomeTeam = whereKey === 'homeTeamId';

    if ((isHomeTeam && homeTeamGoals > awayTeamGoals)
        || (!isHomeTeam && homeTeamGoals < awayTeamGoals)) {
      acc.totalVictories += 1;
      acc.totalPoints += 3;
    } else if (homeTeamGoals === awayTeamGoals) {
      acc.totalDraws += 1;
      acc.totalPoints += 1;
    } else if ((isHomeTeam && homeTeamGoals < awayTeamGoals)
               || (!isHomeTeam && homeTeamGoals > awayTeamGoals)) {
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
}
