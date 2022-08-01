import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne
} from "typeorm"
// import { Course } from "./Course"
import { Module } from "./Module"


@Entity()
export class Lesson extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @Column()
    // courseId: number
    @ManyToOne(()=> Module, module=>module.lessons)
    module: Module

    @Column()
    moduleId: number

    @Column()
    lessonVideo: string

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}