import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    OneToMany
} from "typeorm"
import { Course } from "./Course";
import { Lesson } from "./Lesson";


@Entity()
export class Module extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @Column()
    // categoryId: number
    @ManyToOne(()=> Course, course=>course.modules)
    course: Course

    @OneToMany(()=> Lesson, lesson=>lesson.module)
    lessons: Lesson[];


    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}