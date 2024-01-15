import {
  DataTypes, Model,
} from 'sequelize';
import db from '.';

import { NewEntity } from '../../Interfaces';
import { ITeam } from '../../Interfaces/IEntities';
import SequelizeMatch from './SequelizeMatch';

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

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeTeam;
