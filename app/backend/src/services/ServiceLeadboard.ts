import { Attributes, Model, WhereOptions } from 'sequelize';
import { IMatch, Leadboard, LeadboardAccumulator } from '../Interfaces/IEntities';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ModelReader from '../models/ModelReader';

export default class LeadboardService<T extends Model> extends ModelReader<SequelizeTeam> {
  constructor(protected modelReader: ModelReader<T>) {
    super(SequelizeTeam);
  }

  public async getAll(): Promise<Leadboard[]> {
    const teams = await super.findAll();
    const leadboards = await Promise.all(teams.map((team) => this.calculateLeadboardForTeam(team)));
    return LeadboardService.sortLeadboards(leadboards);
  }

  async calculateLeadboardForTeam(team: SequelizeTeam): Promise<Leadboard> {
    const matches = await this.getMatchesForTeam(team);
    const accumulator = LeadboardService.calculateAccumulator(matches as unknown as IMatch[]);

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
      efficiency: LeadboardService.calculateEfficiency(accumulator.totalPoints, matches.length),
    };
  }

  async getMatchesForTeam(team: SequelizeTeam): Promise<T[]> {
    return this.modelReader.findAll({
      where: {
        homeTeamId: team.id,
        inProgress: false,
      } as unknown as WhereOptions<Attributes<T>>,
    });
  }

  static calculateAccumulator(matches: IMatch[]): LeadboardAccumulator {
    return matches.reduce((acc, cur) => {
      const { homeTeamGoals, awayTeamGoals } = cur as unknown as IMatch;
      acc.goalsFavor += homeTeamGoals;
      acc.goalsOwn += awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      this.updateAccumulatorBasedOnResult(cur, acc);
      return acc;
    }, this.getInitialAccumulator());
  }

  static updateAccumulatorBasedOnResult(match: IMatch, acc: LeadboardAccumulator): void {
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

  static getInitialAccumulator(): LeadboardAccumulator {
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

  static sortLeadboards(leadboards: Leadboard[]): Leadboard[] {
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

async function main() {
  const result = await new LeadboardService(new ModelReader(SequelizeMatch)).getAll();
  console.log(result);
}

main();
