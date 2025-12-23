import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    product_id: string;


    @Column({
        type: 'text',
        unique: true
    })
    name: string;


    @Column({
        type: 'text',
        nullable: true
    })
    description: string;


    @Column({
        type: 'int',
        default: 0
    })
    price: number;



    @Column({
        type: 'text',
    })
    image: string;

    
    @CreateDateColumn()
    created_at: Date;


    @UpdateDateColumn()
    updated_at_at: Date


    @ManyToOne(
        () => Category,
        (category) => category.products
    )
    @JoinColumn({name: 'category_id'})
    category: Category


}
