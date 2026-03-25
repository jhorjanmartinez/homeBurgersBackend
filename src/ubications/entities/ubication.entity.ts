import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ubicationItem } from "./ubication-item.entity";

@Entity('ubications')
export class Ubication {

    @PrimaryGeneratedColumn('uuid')
    ubication_id: string;

    @Column({
        type: 'text',
        unique: true
    })
    name: string


    @Column({
        type: 'varchar',
        unique: true
    })
    slug: string


    @CreateDateColumn()
    created_at: Date;
   
    
    @OneToMany(
        () => ubicationItem,
        (ubicationItem) =>  ubicationItem.ubication
    )
    ubicationsItems: ubicationItem[]












    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.name
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


