import express, { Application } from "express";
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import "reflect-metadata";
import { initConnection } from './db'
import { authRoutes, fixtureRoutes, teamRoutes, searchRoutes } from './routes'
import errorMiddleware from "./middleware/error.middleware";


dotenv.config();
const app: Application = express();
export const PORT = process.env.PORT || 5000;

const accountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 60, // Limit each IP to 5 account requests per `window` (here, per hour)
	message:
		'Too many tries from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

initConnection().then(_ => {

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
  app.use('/search', searchRoutes);
  app.use('/*', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Mock Premier API',
    });
  });
  
  app.use(errorMiddleware)
  
  app.listen(PORT, async() => {
    console.log(`Server started on port ${PORT}`)
    // await initConnection();
  });
})

export default app;