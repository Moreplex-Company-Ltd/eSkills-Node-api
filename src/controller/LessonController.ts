import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"
import { Course } from "../entity/Course"
import { Lesson } from "../entity/Lesson"

const lessonRepository  = AppDataSource.getRepository(Lesson);

export const addLesson = async (req:Request, res:Response, next:NextFunction) => {

    try {
        
        
    } catch (error) {
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

export const upadateLesson = async (req:Request, res:Response, next:NextFunction) => {

    try {
        
    } catch (error) {
        next(error)
    }
    
}