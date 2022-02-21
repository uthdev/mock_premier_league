import { getRepository } from "typeorm";
import { FixtureEntity } from '../db/entity/Fixture'


class FixtureService {
  static async getFixtures(searchQuery: string) {
    let options = {};

    options = {
      ...options,
      where: {
        $or: [
          {'homeTeam.teamName': new RegExp(searchQuery.toString(), 'i')},
          {'awayTeam.teamName': new RegExp(searchQuery.toString(), 'i')},
          {status: new RegExp(searchQuery.toString(), 'i')}
        ]
      }
    }

    const fixtureRepository = getRepository(FixtureEntity);
    const teams = await fixtureRepository.find(options);
    return teams;
  }
}

export default FixtureService;