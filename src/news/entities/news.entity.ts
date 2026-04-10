import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class News {

    @PrimaryGeneratedColumn('uuid')
    news_id: string;



    @Column({
        type:'text'    
    })
    title: string;


    
    @Column({
        type:'text',
        unique: true
    })
    slug: string


    @Column({
        type:'text'
    })
    card_image: string


    @Column({
        type: 'text'
    })
    banner_image: string;


    @Column({
        type:'text'
    })
    content: string;


    @CreateDateColumn()
    created_at: Date;


    @BeforeInsert()
    checkSlugInsert(){
        if(!this.slug){
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            // el elimina todo lo que No sea numeros,letras o guion bajo
            .replace(/[^\w_]/g, '')
    }


}
