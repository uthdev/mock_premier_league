import { NextFunction, Response } from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import RequestWithUser from '../interfaces/requestWithUser.interface';

async function authorizeAdmin(request: RequestWithUser, response: Response, next: NextFunction) {
  if(request.user) {
    const { isAdmin } = request.user;
    if (isAdmin !== true) {
      next(new NotAuthorizedException())
    }
    next();
  }
}

export default authorizeAdmin;