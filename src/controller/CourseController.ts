import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"
import { Course } from "../entity/Course"

const userRepository  = AppDataSource.getRepository(User);
const courseRepository = AppDataSource.getRepository(Course);


export const addCourse =async (req:Request, res:Response, next:NextFunction) => 
{
    // only admin or instructor can add course
    // need name and cat id
    if(!req.body.name){
        return next(new AppError(400, 'Please provide a valid course name'))
    }
    if(!req.body.categoryId){
        return next(new AppError(400, 'Please provide a valid categoryId'))
    }

    try {
        const course = new Course()
        course.name = req.body.name;
        course.category = req.body.categoryId;
        await courseRepository.save(course);

        return res.status(200).json({
            status: "success",
            message: "course added successfully"
        })

    } catch (error) {
        return next(new AppError(400, 'Unable to add course, please try again'))
    }
}


export const getSingleCourse  = async (req:Request, res:Response, next:NextFunction) =>
{
    // returns all courses
    if(!req.params.id){
        return next(new AppError(400, 'No course id passed, please try again'))
    }

    const courses = await courseRepository.find({
        where: {id: req.params.id},
        relations: {
            category: true,
            modules: true
        }
    });

    if(!courses){
        return next(new AppError(400, 'No course found, please upload and try again'))
    }

    return res.status(200).json({
        status: "success",
        data: courses
    })
    
}


export const getAllCourses  = async (req:Request, res:Response, next:NextFunction) =>
{
    // returns all courses
    const courses = await courseRepository.find();

    if(!courses){
        return next(new AppError(400, 'No course found, please upload and try again'))
    }

    return res.status(200).json({
        status: "success",
        data: courses
    })
    
}


export const updateCourseName = async (req:Request, res:Response, next:NextFunction) => 
{
    // updates course name by id
    if(!req.body.id){
        return next (new AppError(400, 'Please provide a valid course id'))
    }
    if(!req.body.course_name){
        return next (new AppError(400, 'Please provide a valid course name'))
    }

    try {
        const course =  await courseRepository.update(req.body.id , {
            name: req.body.course_name
        })

        return res.status(200).json({
            status: 'success',
            message: "course name updated successfully"
        })

    } catch (error) {
        next(error)
    }


}
