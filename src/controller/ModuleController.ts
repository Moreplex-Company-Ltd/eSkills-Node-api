import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"
import { Course } from "../entity/Course"
import { Module } from "../entity/Module"


const moduleRepository = AppDataSource.getRepository(Module);

export const addModule =async (req:Request, res:Response, next:NextFunction) => 
{
    // onmly admin can do this
    //name, course id
    if(!req.body.name){
        return next(new AppError(400, 'Please provide a valid module name'))
    }

    if(!req.body.courseId){
        return next(new AppError(400, 'Please provide a valid module"s category id'))
    }

    try {
        const module = new Module()
        module.name = req.body.name;
        module.course = req.body.courseId
        await moduleRepository.save(module)

        return res.status(200).json({
            status: "success",
            message: "module added successfully"
        })
        
    } catch (error) {
        next(error)
    }
}