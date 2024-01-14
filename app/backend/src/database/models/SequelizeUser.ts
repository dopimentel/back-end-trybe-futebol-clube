import {
  DataTypes, Model,
} from 'sequelize';
import db from '.';

import { NewEntity } from '../../Interfaces';
import { IUser } from '../../Interfaces/IEntities';

class SequelizeUser extends Model<IUser, NewEntity<IUser>> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

SequelizeUser.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUser;
