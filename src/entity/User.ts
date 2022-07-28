import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"


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
    email: string

    @Column({
        nullable: true,
        unique: true
    })
    phoneNumber: string

    

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

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}
