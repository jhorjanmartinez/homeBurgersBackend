import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ubication } from "./ubication.entity";

@Entity('ubications_items')
export class ubicationItem {


    @PrimaryGeneratedColumn('uuid')
    ubication_item_id:string;


    @Column({
        type: 'varchar',
    })
    image: string;


    @Column({
        type:'varchar',
        unique: true
    })
    title:string

    @Column({
        type: 'varchar',
        unique: true
    })
    slug: string


    @Column({
        type: 'varchar'
    })
    description: string


    @Column({
        type: 'varchar'
    })
    google_maps_url: string


    @CreateDateColumn()
    created_at: Date;



    @ManyToOne(
        () => Ubication,
        (ubication) => ubication.ubicationsItems
    )
    @JoinColumn({ name: 'ubication_id' })
    ubication: Ubication





    
    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replace("'", '')

    }



    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '' )
    }


}