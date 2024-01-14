import { ITeam } from "../../Interfaces/IEntities";

const team: ITeam = {
  id: 1,
  teamName: 'Avaí/Kindermann',
};
const team2: ITeam = {
  id: 2,
  teamName: 'Corinthians',
};

export { team, team2 };
export default class MockModel<T> {
  constructor(private entity: T) {}
  
  public findAll(): T[] {
    return [this.entity];
  }

  public findById(id: number): T | undefined {
    return id === 1 ? this.entity : undefined
  }
}
