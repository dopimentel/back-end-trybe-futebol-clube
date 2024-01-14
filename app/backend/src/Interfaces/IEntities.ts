import { Identifiable } from './index';

interface ITeam extends Identifiable {
  teamName: string;
}

interface IUser extends Identifiable {
  username: string;
  role: string;
  email: string;
  password: string;

}

interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export { ITeam, IUser, IMatch };
