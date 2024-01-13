import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const teams = (await this.model.findAll()).map(({ dataValues }) => ({ ...dataValues }));
    return teams;
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team ? { ...team.dataValues } : null;
  }
}

const teamModel = new TeamModel();
teamModel.findAll().then((teams) => {
  console.log(teams);
});
