// import FixtureModel from '../models/fixture.model';

import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { getMongoRepository } from "typeorm";
import { FixtureEntity } from "../db/entity/Fixture";
import { Status } from "../interfaces/fixture.interface";
import NotFoundException from "../exceptions/NotFoundException";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import { generateLink } from "../utils/generateUniqueLink";
import TeamService from "../services/team.service";
import ResourceAlreadyExistsException from "../exceptions/ResourceAlreadyExistException";

class FixtureController {

  static async addFixture(request: RequestWithUser, response: Response, next: NextFunction) {

    const {user, body: { season }} = request;
    try {
      const fixtureRepository = getMongoRepository(FixtureEntity);
      const { homeTeam, awayTeam } = await TeamService.findTeamsByIds(request.body);
      const [fixture] = await fixtureRepository.find({
        where: {
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          season: season
        }
      });
      if(fixture)
        return next(new ResourceAlreadyExistsException("Fixture", `${fixture.homeTeam.teamName} vs ${fixture.awayTeam.teamName} for season ${season}`))
      const newFixture = fixtureRepository.create({ homeTeam, awayTeam, createdBy: user?._id, status: Status.PENDING, season });
      const createdFixture = await fixtureRepository.save(newFixture)
      return response.status(201).json({
        status: 201,
        message: `Fixture created successfully`,
        data: createdFixture,
      });
    } catch (error) {
      next(error);
    }
  }


  static async getFixture(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id
      const fixtureRepository = getMongoRepository(FixtureEntity);
      const fixture = await fixtureRepository.findOne(id);
      if (fixture) {
        fixture.link = generateLink(fixture._id)
        return response.status(200).json({
          status: 200,
          data: fixture
        })
      }
      next(new NotFoundException("Fixture", id))
    } catch (error) {
      next(error);
    }
  }

  static async getAllFixtures(request: Request, response: Response, next: NextFunction) {
    try {
      const status = request.query?.status;
      const fixtureRepository = getMongoRepository(FixtureEntity);
      if(status) {
        const fixtures = await fixtureRepository.find({ where: { status: status } });
        return response.status(200).json({
          status: 200,
          data: fixtures
        })
      } else {
        const fixtures = await fixtureRepository.find();
        return response.status(200).json({
          status: 200,
          data: fixtures
        });
      }
    } catch (error) {
      next(error);
    }
  }


  static async editFixture(request: RequestWithUser, response: Response, next: NextFunction) {
    const fixtureId = request.params.id;
    try {      
      const fixtureRepository = getMongoRepository(FixtureEntity);
      const fixture = await fixtureRepository.findOne(fixtureId);

      if (fixture) {
        if(fixture.status != Status.COMPLETED) {
          const { homeTeam, awayTeam } = await TeamService.findTeamsByIds(request.body);
          fixtureRepository.merge(fixture, {...request.body, homeTeam, awayTeam});
          const updatedFixture = await fixtureRepository.save(fixture)
          return response.status(200).json({
            status: 200,
            message: `Fixtures updated successfully`,
            data: updatedFixture,
          });
        }
        next(new NotAuthorizedException())
      }
      next(new NotFoundException("Fixture", fixtureId))
    } catch (error) {
      next(error);
    }
  }

  static async deleteFixture(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id
      const fixtureRepository = getMongoRepository(FixtureEntity);
      const fixture = await fixtureRepository.findOne(id);

      if (fixture) {
        await fixtureRepository.delete(id)
        return response.status(200).json({
          status: 200,
          message: 'Fixture successfully deleted',
        })
      }
      next(new NotFoundException("Fixture", id))
    } catch (error) {
      next(error)
    }
  }

}

export default FixtureController;