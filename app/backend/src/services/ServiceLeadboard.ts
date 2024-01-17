/* eslint-disable max-lines-per-function */
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

  public async getAllTeamsMatches() {
    const teams = await super.findAll({
      include: [
        {
          model: SequelizeMatch,
          as: 'homeMatches',
        },
        {
          model: SequelizeMatch,
          as: 'awayMatches',
        },
      ],
    });
    return teams;

    // const teams = await super.findAll();
    // const promisses = teams.map(async (team) => {
    //   const matches = await this.modelReader
    //     .findAll({ where: { homeTeamId: team.id } } as unknown as FindOptions<Attributes<T>>);
    //   return matches;
    // });
    // const result = await Promise.all(promisses);
    // return result.flat();
  }

  public async getAll(): Promise<Leadboard[]> {
    const teams = await super.findAll();
    const promisses = teams.map(async (team) => {
      const matches = await this.modelReader
        .findAll({ where: {
          homeTeamId: team.id,
          inProgress: false,
        } } as unknown as FindOptions<Attributes<T>>);
      const leadboard = {
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
    });

    const result = await Promise.all(promisses);

    return result.sort((a, b) => {
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
  const result = await new LeadboardService(new ModelReader(SequelizeMatch)).getAllTeamsMatches();
  console.log(result);
}
main();
