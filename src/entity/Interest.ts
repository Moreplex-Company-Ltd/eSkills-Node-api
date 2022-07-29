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
    OneToOne
} from "typeorm"
import { Category } from "./Category";
import { User } from "./User";


@Entity()
export class Interest extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number


    // userID here
    @Column()
    userId: string

    // catID
    @Column()
    categoryId: number

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}