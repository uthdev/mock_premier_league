import LogInDto from 'dto/logIn.dto';
import { Request, Response, NextFunction } from 'express';
// import omit from 'lodash.omit'
// import WrongCredentialsException from '../exceptions/WrongCredentialsException';
// import Controller from '../interfaces/controller.interface';
// import DataStoredInToken from '../interfaces/dataStoredInToken';
// import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from '../services/authentication.service';
// import LogInDto from './logIn.dto';

class AuthenticationController {
  // private user = userModel;

  // constructor() {
  //   // this.initializeRoutes();
  // }

  // private initializeRoutes() {
  //   this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
  //   this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
  //   this.router.post(`${this.path}/logout`, this.loggingOut);
  // }

  static async registration (request: Request, response: Response, next: NextFunction) {
    const userData: CreateUserDto = request.body;
    try {
      const {
        user,
      } = await AuthenticationService.register(userData);
      console.log(user);
      // response.setHeader('Set-Cookie', [cookie]);
      response.status(201).json({
        status: 201,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async loggingIn (request: Request, response: Response, next: NextFunction) {
    const logInData: LogInDto = request.body;
    try {
      const { user, cookie } = await AuthenticationService.login(logInData);
      console.log(user);
      response.setHeader('Set-Cookie', [cookie]);
      response.status(200).json({
        status: 200,
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  // private loggingOut = (request: Request, response: Response) => {
  //   response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
  //   response.send(200);
  // }

  // private createCookie(tokenData: TokenData) {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  // }

  // private createToken(user: User): TokenData {
  //   const expiresIn = 60 * 60; // an hour
  //   const secret = process.env.JWT_SECRET;
  //   const dataStoredInToken: DataStoredInToken = {
  //     _id: user._id,
  //   };
  //   return {
  //     expiresIn,
  //     token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  //   };
  // }

}

export default AuthenticationController;