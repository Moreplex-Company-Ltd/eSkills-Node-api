import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"
import { Course } from "../entity/Course"
import { Lesson } from "../entity/Lesson"

const lessonRepository  = AppDataSource.getRepository(Lesson);

export const addLesson = async (req:Request, res:Response, next:NextFunction) => 
{
    // only admin can add lesson
    if(!req.body.name){
        return next(new AppError(400, 'Please provide a valid lesson name'))
    }
    if(!req.body.moduleId){
        return next(new AppError(400, 'Please provide a valid lessons"s module id'))
    }
    if(!req.body.videoURL){
        return next(new AppError(400, 'Please provide a valid lessons"s videoURL'))
    }

    
    try {
        const lesson = new Lesson()
        lesson.name = req.body.name
        lesson.module = req.body.moduleId
        lesson.videoURL = req.body.videoURL
        await lessonRepository.save(lesson)

        return res.status(200).json({
            status: 'success',
            message: "Lesson added successfully"
        })
        
        
    } catch (error) {
        console.log(error)
        if(error.code==='23505'){
            return next(new AppError(400, 'Lesson name exists already, please use another one'))
        }
        next(error)
    }
    
};


export const upadateLesson = async (req:Request, res:Response, next:NextFunction) => 
{
    // only admin can add lesson\
    if(!req.body.id){
        return next(new AppError(400, 'Please provide a valid lesson id'))
    }
    if(!req.body.name){
        return next(new AppError(400, 'Please provide a valid lesson name'))
    }
    if(!req.body.videoURL){
        return next(new AppError(400, 'Please provide a valid lessons"s videoURL'))
    }

    try {
        const lesson = await lessonRepository.update(req.body.id, {
            name: req.body.name,
            videoURL: req.body.videoURL
        })

        return res.status(200).json({
            status: "success",
            message: "Lesson updated successfully"
        })

        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
}

export const getSingleLesson = async (req:Request, res:Response, next:NextFunction) => {

    try {
        
    } catch (error) {
        next(error)
    }
    
}

export const getAllLesson = async (req:Request, res:Response, next:NextFunction) => {
    // you can only get all lessons by course id
    try {
        // const lessons = 
        
    } catch (error) {
        next(error)
    }
    
}

