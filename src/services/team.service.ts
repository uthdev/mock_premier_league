import { getRepository } from "typeorm";
import NotFoundException from "../exceptions/NotFoundException";
import { TeamEntity } from '../db/entity/Team'

interface TeamData {
  homeTeam?: TeamEntity
  awayTeam?: TeamEntity
}

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

  static async findTeamsByIds({ homeTeam, awayTeam }: Record<string, string>) {
    const teamRepository = getRepository(TeamEntity);
    const teams = await teamRepository.findByIds([homeTeam, awayTeam]);
    if(teams.length == 2) {
      const teamData: TeamData = {}
      for(let i = 0; i < teams.length; i++) {
        if(homeTeam == teams[i]._id) {
          teamData["homeTeam"] = teams[i]
        } else if(awayTeam == teams[i]._id){
          teamData["awayTeam"] = teams[i]
        }
      }
      return teamData
    } else {
      throw new NotFoundException('Teams', '')
    }
  }
}

export default TeamService;