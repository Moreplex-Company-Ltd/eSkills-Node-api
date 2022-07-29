import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm"


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


    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    
}