import * as express from "express"
import * as bodyParser from "body-parser"
import * as morgan from 'morgan';
import cors = require("cors");
require('dotenv').config()
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./data-source"
// import { Routes } from "./routes"
import { User, UserType } from "./entity/User"
import { createConnection } from "typeorm";

import AppError from "./utils/appError";
import authRoutes from "./routes/authRoutes";
import catRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";






AppDataSource.initialize()
// createConnection()
.then(async  () => {

    // create express app
    const app = express()

    // middlewares
    app.use(bodyParser.json())
    app.use(morgan('dev'));
    app.use(cors());
    

    // routes
    app.use('/api/auth', authRoutes);
    app.use('/api', catRoutes)
    app.use('/api/me', userRoutes)


    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
    //       try {
    //         const result = await (new (route.controller as any))[route.action](req, res, next);
    //         res.json(result);
    //       } catch(err) {
    //         next(err);
    //       }
    //     });
    //   });

    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next)
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result)
    //         }
    //     })
    // })


    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Jon",
    //         lastName: "Dexter",
    //         email : "jondexter20@gmail.com",
    //         role: UserType.ADMIN,
    //     })
    // )    

     // HEALTH CHECKER
     app.get('/api', async (_, res: Response) => {
        res.status(200).json({
          status: 'success',
          message: 'Welcome to skills api v1'
        });
      });

    //   unhandles routes
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new AppError(404, `Route ${req.originalUrl} not found`));
    });


    // global error handler
    app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
          error.status = error.status || 'error';
          error.statusCode = error.statusCode || 500;
  
          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
    );

    const port = 3000

    app.listen(port);
    console.log(`Express server has started on port ${port}.`);
})
.catch(error => console.log(error))

