import { Attributes, FindOptions, Model } from 'sequelize';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ModelReader from '../models/ModelReader';

interface Leadboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class LeadboardService<T extends Model>
  extends ModelReader<SequelizeTeam> {
  constructor(protected modelReader: ModelReader<T>) {
    super(SequelizeTeam);
  }

  public async getAll(): Promise<Leadboard[]> {
    const teams = await super.findAll();
    const matchesPromises = teams.map((team) => this.getMatchesForTeam(team));

    const matchesResults = await Promise.all(matchesPromises);
    const leaderboards = matchesResults
      .map((matches, index) => LeadboardService
        .calculateLeaderboard(teams[index], matches as unknown as SequelizeMatch[]));

    return LeadboardService.sortLeaderboards(leaderboards);
  }

  private async getMatchesForTeam(team: SequelizeTeam): Promise<T[]> {
    return this.modelReader.findAll({
      where: {
        homeTeamId: team.id,
        inProgress: false,
      },
    } as unknown as FindOptions<Attributes<T>>);
  }

  static calculateLeaderboard(team: SequelizeTeam, matches: SequelizeMatch[]): Leadboard {
    const leadboard: Leadboard = {
      name: team.teamName,
      totalPoints: 0,
      totalGames: matches.length,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };

    matches.reduce((acc, cur) => {
      const { homeTeamGoals, awayTeamGoals } = cur as unknown as Attributes<T>;
      acc.goalsFavor += homeTeamGoals;
      acc.goalsOwn += awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      if (homeTeamGoals > awayTeamGoals) { // home team won
        acc.totalVictories += 1;
        acc.totalPoints += 3;
        acc.efficiency = parseFloat(((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2));
        return acc;
      } if (homeTeamGoals === awayTeamGoals) { // draw
        acc.totalDraws += 1;
        acc.totalPoints += 1;
        acc.efficiency = parseFloat(((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2));
        return acc;
      }
      acc.totalLosses += 1;
      acc.efficiency = parseFloat(((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2));
      return acc;
    }, leadboard);
    return leadboard;
  }

  static sortLeaderboards(leaderboards: Leadboard[]): Leadboard[] {
    return leaderboards.sort((a, b) => {
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
  const result = await new LeadboardService(new ModelReader(SequelizeMatch));
  console.log(result);
}
main();
