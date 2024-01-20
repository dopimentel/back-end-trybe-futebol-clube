import SequelizeTeam from '../database/models/SequelizeTeam';

export interface Includable {
  model: typeof SequelizeTeam;
  as: string;
  attributes: string[];
}
export interface IOptions<T> {
  where?: Partial<T>;
  include?: Includable[];
}
