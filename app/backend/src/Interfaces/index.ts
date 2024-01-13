import IModel from './IModel';

type NewEntity<T> = Omit<T, 'id'>;

export default IModel;

export { NewEntity };
