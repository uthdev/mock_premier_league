import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';

// import HttpException from "exceptions/HttpException";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Application = express();

//helmet
app.use(helmet());

// Body parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));

// app.get(
//     "/",
//     async (req: Request, res: Response): Promise<Response> => {
//         return res.status(200).send({
//             message: "Hello World!",
//         });
//     }
// );

// try {
//   app.listen(PORT, (): void => {
//       console.log(`Connected successfully on port ${PORT}`);
//   });
// } catch (error: any){
//   console.error(`Error occured: ${error.message}`);
// }
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;