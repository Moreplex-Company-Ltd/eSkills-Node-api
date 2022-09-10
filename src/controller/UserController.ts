import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Interest } from "../entity/Interest"
import AppError from "../utils/appError"


const userRepository = AppDataSource.getRepository(User);
const interestRepository = AppDataSource.getRepository(Interest);



export const addInterest =  async(req: Request, res: Response, next: NextFunction) => 
{
    try {
        const userId: any = req.user.id
        const interests = req.body.interests
        console.log('interestsv =>', interests)
        if(!req.body.interests){
            return next(new AppError(400, 'Please provide an array of interest ids'));
        }
        const userr = await userRepository.findOneBy({id: userId})
        // console.log(userr)

        // const rr =  await interestRepository.find({ where: { category: userId}})
        // console.log(rr)

        // insert into interest table
        try {
            interests.map(async(interest: any)=> {
                console.log(userId, interest)
                const item = await interestRepository.find({ relations: { user: false}, where: {category: interest} })
                console.log("item here->>", item)
                // if(){
                    const newInterest = new Interest()
                    newInterest.user = userId;
                    newInterest.category = interest;

                    const res = await interestRepository.save(newInterest)
                    console.log(res)
                // }
                

                
                // this works, but i think we neeed to improve upon it and remove the duplicate data
                
            })
            // save interests first
            

            return res.status(201).json({
                status: 'success',
                message: 'Interest added successfully'
            })

            

            
        } catch (error) {
            console.log(error)
            return next(new AppError(400, 'Unable to add new interest, please try again'))
        }
        

        // const record =  await interestRepository.save({
        //     userId: userId,
        //     categoryId: 
        // })
        

        
    } catch (error) {
        next(error)
    }
}

export const getMyInterests =async (req:Request, res:Response, next:NextFunction) => 
{
    try {
        console.log("--> UserID -",  req.user.id)
        const interests = await interestRepository.find({
            where: { user: req.user.id},
            // select: {categoryId: true}
            relations: {user: true}
        })

        console.log(interests)
        
    } catch (error:any) {
        console.log(error)
        next(error)
    }
}

export const getUserInfo = async(req: Request, res: Response, next: NextFunction)=>
{
    try {
        
        const user = await userRepository.find({
            where: {id: req.user.id},
            relations: { interests: true}
            
        });
        console.log(user)
        if(!user){
            return next(new AppError(400, 'No user found for the id passed'))
        }

        // get his interests
        // const interests = interestRepository.f

        return res.status(200).json({
            status: "success",
            user
        })
        
    } catch (error) {
        next(error)
    }
}

// export class UserController {

//     private userRepository = getRepository(User)

//     async all(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.find()
//     }

//     async one(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.findOneBy({ id: request.params.id})
//     }

//     async save(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.save(request.body)
//     }

//     async remove(request: Request, response: Response, next: NextFunction) {
//         let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
//         await this.userRepository.remove(userToRemove)
//     }

// }


