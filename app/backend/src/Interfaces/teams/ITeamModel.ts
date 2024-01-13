import IModel from '../IModel';
import { ITeam } from './ITeam';

export interface ITeamModel extends IModel<ITeam> {
  findAll: () => Promise<ITeam[]>;
  findById: (id: ITeam['id']) => Promise<ITeam | null>;

}
