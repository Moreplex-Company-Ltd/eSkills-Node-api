import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express"
import { Category } from "../entity/Category";
import AppError from "../utils/appError";
import { AppDataSource } from "../data-source";


const categoryRepository = AppDataSource.getRepository(Category);


export const getAllCategories = async (req: Request, res: Response, next: NextFunction)=> 
{
    try {
        const result = await categoryRepository.find();
        if(result.length===0){
            return res.status(400).json({
                status: "success",
                message: "No data found"
            })
        }

        return res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const addCategory =async (req: Request, res: Response, next: NextFunction) => 
{
    try {
        console.log(req.body)
        // lets validata all input
        const name  = req.body.name;
        const description = req.body.description;
        const catURL = req.body.catURL

        if(!name){
            return next (new AppError(400, 'Please provide a valid category name'))
        }
        if(!description){
            return next(new AppError(400, 'Please provide a valid cateory decription'))
        }
        if(!catURL){
            return next(new AppError(400, 'Please provide a valid category url'))
        }

        const newCat = await categoryRepository.save({name, description, catURL})

        if(!newCat){
            return next(new AppError(400, 'Unable to create category, please try again'))
        }

        return res.status(201).json({
            status: 'success',
            message: "Category added successfully"
        })
        
    } catch (error: any) {
        next(error)
    }    
}


export const updateCategory = async(req: Request, res: Response, next: NextFunction) =>
{
    try {
        if(!req.params.id){
            return next(new AppError(400, "Please provide a cat id in the param"))
        }

        const cat = await categoryRepository.update(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            catURL: req.body.catURL,
            updated_at: new Date()
        })


        return res.status(201).json({
            status: 'success',
            message: "category updated successfully"
        })

        
    } catch (error: any) {
        next(error)
    }
}


export const getSingleCategory = async(req: Request, res: Response, next: NextFunction) =>
{
    
    try {
        if(!req.params.id){
            return next(new AppError(400, "Please provide a cat id in the param"))
        }
        try {
            const cat = await categoryRepository.findBy({id: req.params.id})
            
            if(!cat){
                return next(new AppError(400, 'No category exists for the given id'))
            }

            return res.status(200).json({
                status: 'success',
                data: cat
            })
        } catch (error: any) {
            console.log(error)
        }
    } catch (error: any) {
        next(error)
    }
}
