import { Request, Response, NextFunction } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { getRepository } from "typeorm";
import { TeamEntity } from '../db/entity/Team'
import NotFoundException from '../exceptions/NotFoundException';

class TeamController {
  static async addTeam(request: RequestWithUser, response: Response, next: NextFunction) {
    try {
      const teamRepository = getRepository(TeamEntity);
      const owner = request.user

      const team = teamRepository.create({...request.body, createdBy: owner?._id})
      const savedTeam = await teamRepository.save(team);
      return response.status(201).json({
        status: 201,
        data: savedTeam
      })
    } catch (error) {
      next(error)
    }
  }


  static async getTeam(request: Request, response: Response, next: NextFunction) {
    try {
      const teamId = request.params.id;

      console.log(teamId);
      const teamRepository = getRepository(TeamEntity);
      const team = await teamRepository.findOne(teamId)
      console.log(team);


      if (!team) {
        next(new NotFoundException("Team", teamId))
      } else {
        return response.status(200).json({
          status: 200,
          data: team
        })
      }

    } catch (error) {
      next(error)
    }
  }

  static async getALLTeams(request: Request, response: Response, next: NextFunction) {
    try {

      const teamRepository = getRepository(TeamEntity);
      const teams = await teamRepository.find()
      console.log(teams);

      return response.status(200).json({
        status: 200,
        data: teams
      })
    } catch (error) {
      next(error)
    }
  }


  static async editTeam(request: Request, response: Response, next: NextFunction) {
    try {
      const teamId = request.params.id;

      const teamRepository = getRepository(TeamEntity);
      const team = await teamRepository.findOne(teamId)
      if (team) {
        teamRepository.merge(team, request.body);
        const updatedTeam = await teamRepository.save(team);
        return response.status(200).json({
          status: 200,
          data: updatedTeam
        })
      }
      next(new NotFoundException("Team", teamId))
    } catch (error) {
      next(error)
    }
  }


  static async deleteTeam(request: Request, response: Response, next: NextFunction) {
    try {
      const teamId = request.params.id
      const teamRepository = getRepository(TeamEntity);
      const team = await teamRepository.findOne(teamId)

      if (team) {
        await teamRepository.delete(teamId)
        return response.status(200).json({
          status: 200,
          data: {
            message: 'team successfully deleted',
          },
        })
      }

      next(new NotFoundException("Team", teamId))
    } catch (error) {
      next(error)
    }
  }
}

export default TeamController