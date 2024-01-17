import { Attributes, FindOptions, Model } from 'sequelize';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ModelReader from '../models/ModelReader';
import calculateLeaderboard from '../utils/calculateLeaderboard';
import sortLeaderboards from '../utils/sortLeaderboards';
import { Leadboard } from '../Interfaces/IEntities';

export default class LeadboardService<T extends Model>
  extends ModelReader<SequelizeTeam> {
  constructor(protected modelReader: ModelReader<T>) {
    super(SequelizeTeam);
  }

  public async getAll(): Promise<Leadboard[]> {
    const teams = await super.findAll();
    const matchesPromises = teams.map((team) => this.getMatchesForTeam(team));

    const matchesResults = await Promise.all(matchesPromises);
    const leaderboards = matchesResults
      .map((matches, index) => calculateLeaderboard(
        teams[index],
        matches as unknown as SequelizeMatch[],
      ));

    return sortLeaderboards(leaderboards);
  }

  private async getMatchesForTeam(team: SequelizeTeam): Promise<T[]> {
    return this.modelReader.findAll({
      where: {
        homeTeamId: team.id,
        inProgress: false,
      },
    } as unknown as FindOptions<Attributes<T>>);
  }
}

// Move the 'calculateLeaderboard' and 'sortLeaderboards' methods outside of the 'LeadboardService' class
// and into a separate file, e.g., 'leadboardUtils.ts'

// leadboardUtils.ts
// export function calculateLeaderboard(team: SequelizeTeam, matches: SequelizeMatch[]): Leadboard {
// Existing implementation of the 'calculateLeaderboard' method
// }

// export function sortLeaderboards(leaderboards: Leadboard[]): Leadboard[] {
// Existing implementation of the 'sortLeaderboards' method
// }

// Import and use the 'calculateLeaderboard' and 'sortLeaderboards' methods in the 'LeadboardService' class
// export default class LeadboardService<T extends Model> extends ModelReader<SequelizeTeam> {
// Existing implementation of the 'LeadboardService' class
//   }
// }

async function main() {
  const result = await new LeadboardService(new ModelReader(SequelizeMatch));
  console.log(result);
}
main();
