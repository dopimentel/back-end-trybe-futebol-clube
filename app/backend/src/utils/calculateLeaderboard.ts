/* eslint-disable max-lines-per-function */

import SequelizeMatch from '../database/models/SequelizeMatch';
import { Leadboard } from '../Interfaces/IEntities';
import SequelizeTeam from '../database/models/SequelizeTeam';

/* eslint-disable max-len */
export default function calculateLeaderboard(team: SequelizeTeam, matches: SequelizeMatch[]): Leadboard {
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
    const { homeTeamGoals, awayTeamGoals } = cur as unknown as SequelizeMatch;
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
