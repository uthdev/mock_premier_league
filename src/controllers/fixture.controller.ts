// import FixtureModel from '../models/fixture.model';

import { Request, Response, NextFunction } from "express";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { getRepository } from "typeorm";
import { FixtureEntity } from "../db/entity/Fixture";
import { Status } from "../interfaces/fixture.interface";
import NotFoundException from "../exceptions/NotFoundException";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import { generateLink } from "../utils/generateUniqueLink";

class FixtureController {

  static async addFixture(request: RequestWithUser, response: Response, next: NextFunction) {

    const user = request.user;
    try {
      const fixtureRepository = getRepository(FixtureEntity);
      const fixture = fixtureRepository.create({...request.body, createdBy: user?._id, status: Status.PENDING});
      const createdFixture = await fixtureRepository.save(fixture)
      return response.status(201).json({
        status: 201,
        data: createdFixture,
      });
    } catch (error) {
      next(error);
    }
  }


  static async getFixture(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id
      const fixtureRepository = getRepository(FixtureEntity);
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
      const fixtureRepository = getRepository(FixtureEntity);
      if(status) {
        const fixtures = await fixtureRepository.find({ where: { status: status } });
        if (fixtures.length > 0) {
          return response.status(200).json({
            status: 200,
            data: fixtures
          })
        }
        next(new NotFoundException(`${status} fixtures`, ''))
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
      const fixtureRepository = getRepository(FixtureEntity);
      const fixture = await fixtureRepository.findOne(fixtureId);

      if (fixture) {
        if(fixture.status != Status.COMPLETED) {
          fixtureRepository.merge(fixture, request.body);
          const updatedFixture = await fixtureRepository.save(fixture)
          console.log(updatedFixture); 
          return response.status(200).json({
            status: 'success',
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


  // static async addScore(request: RequestWithUser, response: Response, next: NextFunction) {
  //   const fixtureId = request.params.id;
  //   const userId = request.user
  //   const fixture = request.body;
  //   try {
  //     const args = {
  //       fixtureId,
  //       userId,
  //       fixture
  //     };
  //     const found = await FixtureModel.findById(fixtureId)

  //     if (found) {
  //       const updatedWithScores = await FixtureModel.addScore(args);

  //       return res.status(200).json({
  //         status: 'success',
  //         message: `Scores updated successfully`,
  //         data: updatedWithScores,
  //       });
  //     }
  //     return res.status(400).json({
  //       status: 'Request failed',
  //       error: 'Fixture not found',
  //     })

  //   } catch (error) {
  //     return res.status(400).json({
  //       status: 'Request failed',
  //       error: error,
  //     });
  //   }
  // }


  static async deleteFixture(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id
      const fixtureRepository = getRepository(FixtureEntity);
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

  static async getFixturesByStatus(request: Request, response: Response, next: NextFunction) {
    try {
      const status = request.query?.status;

      const fixtureRepository = getRepository(FixtureEntity);
      const fixtures = await fixtureRepository.find({ where: { status: status } });

      if (fixtures.length > 0) {
        return response.status(200).json({
          status: 200,
          data: fixtures
        })
      }
      next(new NotFoundException(`${status} fixtures`, ''))
    } catch (error) {
      next(error);
    }
  }

}

export default FixtureController;