import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm"
import { Course } from "./Course";
import { Lesson } from "./Lesson";


@Entity()
export class Module extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    // @Column()
    // categoryId: number
    @ManyToOne(()=> Course, course=>course.modules)
    @JoinColumn({name:'course'})
    course: Course

    @OneToMany(()=> Lesson, lesson=>lesson.module)
    lessons: Lesson[];


    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}