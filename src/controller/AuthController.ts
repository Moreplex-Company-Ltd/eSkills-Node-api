import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { NextFunction, Request, Response } from "express"
const bcrypt = require('bcryptjs')
import AppError from "../utils/appError";
import { AppDataSource } from "../data-source";
import jwtDecode from "jwt-decode";

const userRepository = AppDataSource.getRepository(User);




export const signIn =  async (req: Request, res: Response, next: NextFunction ) => 
{
    try {
        const  email  = req.body?.email;
        const phoneNumber = req.body?.phoneNumber
        const {password} = req.body
        console.log(email, phoneNumber, password)

        // manual verification
        if(!phoneNumber && !email) {
            return next (new AppError(400, 'Please provide either a phoneNumber or an email'))
        }
        if(!password){
            return next (new AppError(400, 'Please provide a password'))
        }

        // all through
        const user = email ?  await userRepository.findOneBy({email:email}) : await userRepository.findOneBy({phoneNumber:phoneNumber})
        if(!user){
            return next (new AppError(400, 'Incorrect phone number or email, please try again'))
        }
        console.log(user)

        // now check the password
        if(!(await User.comparePasswords(password, user.password))) {
            return next (new AppError(400, 'Incorrect password'));
        }

        // generate refresh and access tokens
        const { accessToken, refreshToken, bearerToken} = await User.signTokens(user)

        return res.status(200).json({
            status: 'success',
            accessToken,
            bearerToken
        })


        
    } catch (error) {
        console.log(error)
        next(error)
    }
    
 
}



export const signUp = async (req: Request, res: Response, next: NextFunction) => 
{
    try {
        // takes 

        let email = null
        let phoneNumber  = null
        const type = req.body.type;
        if(type === 'phone'){
            phoneNumber = req.body.phoneNumber;
            if(!phoneNumber || phoneNumber.length != 10){
                return next(new AppError(400, 'Please provide a valid phone number'))
            }
            if(await userRepository.findOneBy({phoneNumber: phoneNumber})){
                return next(new AppError(400, 'Phone number taken already, please enter a different one'))
            }

        }else if(type === 'email'){
            email  = req.body.email;
            if(!email){
                return next (new AppError(400, 'Please provide a valid email'))
            }
            if(await userRepository.findOneBy({email: email})){
                return next(new AppError(400, 'Email taken already, please enter different email'));
            }
        }


        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        

        if(!firstName || !lastName || !password){
            return next(new AppError(400, 'Please provide firstName, lastName and password'));
        }

        // hash password
        const hashedPassword =  await bcrypt.hash(password, 15);

        // all through, save user now
        const newUser = {
            firstName, lastName, password:hashedPassword, phoneNumber, email
        }
        const user =  await userRepository.save(newUser);

        if(!user){
            return next(new AppError(400, 'Unable to register user, please try again'))
        }

        // generate refresh and access tokens
        const { accessToken, refreshToken, bearerToken} = await User.signTokens(user)

        return res.status(200).json({
            status: 'success',
            accessToken,
            bearerToken
        })



    } catch(error){
        next(error)
    }
}


export const signUpWithGoogle = async (req:Request, res:Response, next: NextFunction) => {
    try {
        // obtain the token from the frontend and sign up user, we use email as password
        const token  = req.body.token;
        if(!token) {
            return next(new AppError(400, "No token passed"))
        }

        const decodedToken: any = jwtDecode(token)
        console.log(decodedToken)
        
        // check if user exist, if not then we create an account
        
        let user = await userRepository.findOneBy({email: decodedToken.email})

        if(user){
            // user exits already
            // generate refresh and access tokens
            const { accessToken, refreshToken, bearerToken} = await User.signTokens(user)

            return res.status(200).json({
                status: "success",
                message: "Old user, logged in successfully",
                accessToken,
                bearerToken
            })
        }
        
        const newUser = {
            firstName: decodedToken.given_name,
            lastName: decodedToken.family_name,
            email: decodedToken.email,
            avatarURL: decodedToken.picture,
            password:  await bcrypt.hash(decodedToken.email, 15),
            accountVerified: true
        }

       const savedUser =  await userRepository.save(newUser)
       const { accessToken, refreshToken, bearerToken} = await User.signTokens(savedUser)

        return res.status(200).json({
            status: "success",
            message: "New user, logged in successfully",
            accessToken,
            bearerToken,

        })


        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
