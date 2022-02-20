import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

// class ValidatorErrors extends ValidationError {
//   constraints: {
//     [type: string]: string;
//   }
// }

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties })
      .then((errors:any) => {
        if (errors.length > 0) {
          const message = errors.map((error: any) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware;
