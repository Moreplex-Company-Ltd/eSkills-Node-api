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
        const userId = req.body.userId
        const interests = req.body.interests

        // insert into interest table
        try {
            // interests.map(async(interest: number)=> {
            //     console.log(userId, interest)
            //     await interestRepository.save({
            //         userId: userId,
            //         categoryId: interest
            //     })
            // })
            // save interests first
            interests.map( async (interest)=>{
                try {
                    const int = new Interest()
                    int.user = userId;
                    int.categoryId = interest;
                    await interestRepository.save(int)
                    
                } catch (error) {
                    return next (new AppError(400, 'Error adding interest, please try again'))
                }

            })

            

            return res.status(201).json({
                status: 'success',
                message: 'Interest added successfully'
            })
        } catch (error) {
            return next(new AppError(400, 'Unable to add new interest, please try again'))
        }
        

        // const record =  await interestRepository.save({
        //     userId: userId,
        //     categoryId: 
        // })
        
        console.log(req.body)
        
    } catch (error) {
        next(error)
    }
}

export const getMyInterests =async (req:Request, res:Response, next:NextFunction) => 
{
    try {
        const interests = interestRepository.findBy({user: req.body.userId})
        
    } catch (error:any) {
        next(error)
    }
}

export const getUserInfo = async(req: Request, res: Response, next: NextFunction)=>
{
    try {
        if(!req.params.id){
            return next(new AppError(400, 'No user id passed'))
        }

        const user = await userRepository.find({
            where: {id: req.params.id},
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
            user: user
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


