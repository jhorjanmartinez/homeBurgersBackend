import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Home } from "./home.entity";


@Entity()
export class HomeCarrouselItem {


    @PrimaryGeneratedColumn('uuid')
    home_carrousel_item_id: string


    @Column({
        type: 'text'
    })
    imagesUrl: string
    

    @Column({
        type: 'text',
    })
    title: string


    @Column({
        type:'text',
        unique: true
    })
    slug: string 

    @ManyToOne(
        () => Home,
        (home) => home.homeCarrousels
    )
    homes: Home


    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.title
        }


        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

}