import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customization } from "./customization.entity";

@Index(['customization', 'name'], { unique: true })
@Entity('customization_items')
export class Customization_item {


    @PrimaryGeneratedColumn('uuid')
    customization_item_id: string

    @Column({
        type: 'text',
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