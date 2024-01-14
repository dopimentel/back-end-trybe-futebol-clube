import {
  DataTypes, Model,
} from 'sequelize';
import db from '.';

import { NewEntity } from '../../Interfaces';
import { ITeam } from '../../Interfaces/teams/ITeam';

class SequelizeTeam extends Model<ITeam, NewEntity<ITeam>> {
  declare id: number;
  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },

}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default SequelizeTeam;
