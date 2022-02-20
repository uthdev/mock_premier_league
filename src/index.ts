import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
import { initConnection } from './db'
import { authRoutes, fixtureRoutes, teamRoutes } from './routes'
import errorMiddleware from "./middleware/error.middleware";


// import router from './routes';

// import HttpException from "exceptions/HttpException";

dotenv.config();
const app: Application = express();
export const PORT = process.env.PORT || 5000;

const accountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 account requests per `window` (here, per hour)
	message:
		'Too many tries from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

initConnection().then(db => {
  // console.log(db)

  //helmet
  app.use(helmet());
  
  // Body parsing Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  const corsOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOption));

  
  app.use('/auth', accountLimiter, authRoutes);
  app.use('/teams', teamRoutes);
  app.use('/fixtures', fixtureRoutes);
  
  app.use(errorMiddleware)
  
  app.listen(PORT, async() => {
    console.log(`Server started on port ${PORT}`)
    // await initConnection();
  });
})

export default app;