import { Request, Response, NextFunction } from "express";

import TeamService from '../services/team.service';
import FixtureService from '../services/fixtures.service';
import Team from "../interfaces/team.interface";
import { FixtureEntity } from "../db/entity/Fixture";


class SearchController {
  static async find(request: Request, response: Response, next: NextFunction) {
    try {
      const searchQuery = request.query?.q?.toString();
      if(searchQuery) {
        const teams: Team[] = await TeamService.getTeams(searchQuery);
        const fixtures: FixtureEntity[] = await FixtureService.getFixtures(searchQuery);
        const data = {
          teams, fixtures
        }
        return response.status(200).json({
          status: 200,
          data,
        })
      }
      
    } catch (error) {
      next(error)
    }
  }
}

export default SearchController;