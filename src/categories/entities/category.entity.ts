import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    category_id: string;

    @Column({
        type: 'text',
        unique: true
    })
    name: string;


    @Column({
        type: 'text',
    })
    slug: string;


    @Column({
        type:'text'
    })
    icon: string;



    @OneToMany(
        () => Product,
        (product) => product.category,
    )
    products: Product[]


    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug ){
            this.slug = this.name;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }


    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }


}
