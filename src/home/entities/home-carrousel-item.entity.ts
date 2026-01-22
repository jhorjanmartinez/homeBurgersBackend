import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(
        () => Home,
        (home) => home.homeCarrousels
    )
    homes: Home



}