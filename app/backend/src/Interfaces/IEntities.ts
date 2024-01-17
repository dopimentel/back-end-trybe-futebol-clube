import { Identifiable } from './index';

export interface IToken {
  token: string;
}

export interface ITeam extends Identifiable {
  teamName: string;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IUser extends Identifiable, ILogin {
  username: string;
  role: string;

}

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface Leadboard {
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
