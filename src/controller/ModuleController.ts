import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"
import { Course } from "../entity/Course"
import { Module } from "../entity/Module"


const moduleRepository = AppDataSource.getRepository(Module);
const courseRepository = AppDataSource.getRepository(Course);

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

    // check if couredId exists
    try {
        const course = await courseRepository.findBy({id: req.body.courseId});
        if(!course || course.length==0){
            return next(new AppError(400, 'No category exists for the id passed. please check and try again'))
        }
        
    } catch (error) {
        next(error)
    }
    

    try {
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
            // console.log(error)
            if(error.code === '23505'){
                return next(new AppError(400, 'Moulde name exits already, please add another one'));
            }
            return next(new AppError(400, 'Unable to add new module, please try again'))
        }
        
    } catch (error) {
        next(error)
    }
}


export const updateModuleName =async (req:Request, res:Response, next:NextFunction) => 
{
    // update module using mudule id
    if(!req.body.moduleId){
        return next(new AppError(400, 'Please provide a valid module id'))
    }
    if(!req.body.moduleName) {
        return next(new AppError(400, 'Please provide a valid module name'))
    }

    try {
        const module = await moduleRepository.update(req.body.moduleId, {
            name: req.body.moduleName
        });

        console.log(module)
    } catch (error) {
        console.log(error)
        next(new AppError(400, 'Unable to update module name, please try again'))
    }
    
    return res.status(200).json({
        status: "success",
        message: "Module updated successfully"
    })

}


export const getAllCouseMoudules =async (req:Request, res:Response, next:NextFunction) => 
{
    // get all modules for a given course id
    if(!req.params.id){
        return next(new AppError(400, 'Please provide a valid course id in'))
    }

    try {
        console.log(req.params.id)
        const modules = await moduleRepository.findOne({
            where: {id: req.params.id},
            relations: {
                lessons: true,
                course: true
            },
            
        })

        console.log(modules)

        if(!modules ){
            return next(new AppError(400, 'No module found for this course, please consider adding some'))
        }

        return res.status(200).json({
            status: 'success',
            data: modules
        })
        
    } catch (error) {
        console.log(error)
        next(error)
    }


}