import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
 
const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  // console.log(error)
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .json({
      status,
      message,
    })
}
 
export default errorMiddleware;