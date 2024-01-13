import { Model } from 'sequelize';
import { ID, ICRUDModelReader } from './ICRUDModel';

type NewEntity<T> = Omit<T, ID>;
type Identifiable = { id: ID };

export default class IModel<T extends Identifiable> extends Model<T, NewEntity<T>> {}

export { NewEntity, ID, Identifiable, ICRUDModelReader };
