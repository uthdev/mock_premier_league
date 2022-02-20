import CreateUserDto from '../dto/user.dto';
import { Router } from 'express';
import validationMiddleware from '../middleware/validation.middleware';
import AuthController from '../controllers/authentication.controller';

const authRoute = Router();

const { registration} = AuthController;


authRoute.post('/signup', validationMiddleware(CreateUserDto), registration);
// authRoute.post('/signin', loginValidator, login);

export default authRoute;