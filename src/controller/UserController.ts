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
        const userId = req.user.id
        const interests = req.body.interests
        console.log('interestsv =>', interests)
        if(!req.body.interests){
            return next(new AppError(400, 'Please provide an array of interest ids'));
        }

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
                    int.category = interest;
                    console.log('logs int=>',int)
                    const rest = await interestRepository
                        .createQueryBuilder()
                        .insert()
                        .into(Interest)
                        .values(int)
                        // .onConflict(`("categoryId") DO NOTHING`)
                        .execute();

                    console.log('logs query result=>', rest)
                    
                } catch (error) {
                    console.log('logs error=>', error)
                    return next (new AppError(400, 'Error adding interest, please try again'))
                }

            })

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
        
        console.log(req.body)
        
    } catch (error) {
        next(error)
    }
}

export const getMyInterests =async (req:Request, res:Response, next:NextFunction) => 
{
    try {
        console.log(req.user.id)
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


