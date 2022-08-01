
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
import { Category } from "./Category";
import { Lesson } from "./Lesson";
import { Module } from "./Module";


@Entity()
export class Course extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    name: string

    // @Column()
    // categoryId: number
    // category
    @ManyToOne(()=> Category, category=>category.courses)
    category: Category

    @OneToMany(()=> Module, module=>module.course)
    modules: Module[];

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}