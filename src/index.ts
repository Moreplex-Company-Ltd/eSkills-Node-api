import * as express from "express"
import * as bodyParser from "body-parser"
import * as morgan from 'morgan';
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User, UserType } from "./entity/User"

const port = 3000

function handleError(err: { statusCode: any; message: any }, _req: any, res: { status: (arg0: any) => { (): any; new(): any; send: { (arg0: any): void; new(): any } } }, _next: any) {
    res.status(err.statusCode || 500).send(err.message)
  }

//   function handleError(err, _req, res, _next) {
//     res.status(err.statusCode || 500).send(err.message)
//   }

AppDataSource.initialize()
.then(async () => {

    // create express app
    const app = express()
    app.use(morgan('tiny'));
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
          try {
            const result = await (new (route.controller as any))[route.action](req, res, next);
            res.json(result);
          } catch(err) {
            next(err);
          }
        });
      });
      
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

    app.use(handleError);
    app.listen(port);
    console.log(`Express server has started on port ${port}.`);
})
.catch(error => console.log(error))

