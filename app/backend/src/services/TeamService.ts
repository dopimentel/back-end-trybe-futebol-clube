import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Team with id ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}

// const teamService = new TeamService();
// teamService.getAllTeams().then((teams) => {
//   console.log(teams);
// });
