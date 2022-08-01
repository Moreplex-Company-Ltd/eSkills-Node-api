const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm"
import {
    IsEmail, Length, MinLength
} from 'class-validator'
import { signJWT } from "../utils/jwt"
import { Interest } from "./Interest"


export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER",
    INSTRUCTOR = "INSTRUCTOR",
}

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({
        nullable:true,
        unique: true
    })
    @IsEmail({message: "Please provide a valid email"})
    email: string

    @Column({
        nullable: true,
        unique: true
    })
    @Length(10,10, {message: "Please provide a valid phone number"})
    phoneNumber: string

    @Column({
        select: true,
        default: 'mypassword'
    })
    @MinLength(6, {message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value'})
    password: string;

    @Column({
        default: 'https://res.cloudinary.com/jondexter/image/upload/v1629122461/avatars/user_ywbrdf.png',
      })
      avatarURL: string;

    @Column({
        type: "boolean",
        default: false
    })
    accountVerified: string

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.USER
    })
    role: UserType


    @OneToMany(()=> Interest, interest=> interest.user )
    interests: Interest[];

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;


    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
      ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    static async signTokens (user: User){
        // create access and refresh tokens and return them
        const accessToken = signJWT({user: user.id}, 'accessTokenPrivateKey', {
            expiresIn: '5h'
        })

        const refreshToken = signJWT({user: user.id}, 'refreshTokenPrivateKey', {
            expiresIn: '5h'
        })

        const bearerToken = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            role: user.role,
            avatarURL: user.avatarURL
        },
        process.env.SECRET_OR_KEY || 'secretekey1234'
        )


        return { accessToken, refreshToken, bearerToken}
    }

    toJSON() {
        return { 
            ...this, 
            password: undefined,  };
      }

}

