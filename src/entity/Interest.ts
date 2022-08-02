import { type } from "os";
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    JoinColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm"
import { Category } from "./Category";
import { User } from "./User";


@Entity()
export class Interest extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number


    // userID here
    // @Column()
    // userId: string
    @ManyToOne(()=>User, user=>user.interests)
    user: User

    // // catID

 
    // @OneToMany(()=>Category, category=>category.name, { eager: true, cascade: true})
    // // @JoinColumn()
    // category: Category
    
    @OneToOne(()=>Category, {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    category: Category

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}