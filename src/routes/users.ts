import { Router } from 'express';
import CreateUserDto from '../dto/user.dto';
import validationMiddleware from '../middleware/validation.middleware';
import AuthController from '../controllers/authentication.controller';
import LogInDto from '../dto/logIn.dto';

const authRoute = Router();

const { registration, loggingIn} = AuthController;


authRoute.post('/signup', validationMiddleware(CreateUserDto), registration);
authRoute.post('/login', validationMiddleware(LogInDto), loggingIn);

export default authRoute;