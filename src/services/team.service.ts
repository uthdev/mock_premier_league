import { getRepository } from "typeorm";
import { TeamEntity } from '../db/entity/Team'

class TeamService {
  static async getTeams(searchQuery: string) {
    let options = {};

    options = {
      ...options,
      where: {
        teamName: new RegExp(searchQuery.toString(), 'i')

      }
    }

    const teamRepository = getRepository(TeamEntity);
    const teams = await teamRepository.find(options);
    return teams;
  }
}

export default TeamService;