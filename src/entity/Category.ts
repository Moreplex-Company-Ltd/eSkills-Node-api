import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm"
import { Course } from "./Course"


@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    name: string


    @Column({
        type: 'text'
    })
    description: string

    @Column()
    catURL: string

    @OneToMany(()=> Course, course=>course.category)
    courses: Course[];


    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    
}