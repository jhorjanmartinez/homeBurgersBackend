import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('caterings')
export class Catering {

    @PrimaryGeneratedColumn('uuid')
    catering_id: string

    @Column({
        type: 'text',
    })
    names: string


    @Column({
        type:'text',
    })
    telephone: string

    @Column({
        type: 'text'
    })
    email: string


    @Column({
        type:'text'
    })
    message: string

}
