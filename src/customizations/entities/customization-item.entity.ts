import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customization } from "./customization.entity";

@Entity('customization_items')
export class Customization_item {


    @PrimaryGeneratedColumn('uuid')
    customization_item_id: string

    @Column({
        type: 'text',
        unique: true
    })
    name: string

    @Column({
        type: 'int',
    })
    price: number;


    @ManyToOne(
        () => Customization,
        (customization) => customization.customization_items
    )
    @JoinColumn({ name: 'customization_id'})
    customization: Customization


    @CreateDateColumn()
    created_at: Date;


    @UpdateDateColumn()
    updated_at: Date;

}