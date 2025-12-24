import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomizationOptionType } from "../customization-option.enum";
import { Customization_item } from "./customization-item.entity";

@Entity('customizations')
export class Customization {

    @PrimaryGeneratedColumn('uuid')
    customization_id: string

    @Column({
        type: 'text',
        unique: true
    })
    title:string


    @Column({
        type:'enum',
        enum: CustomizationOptionType,
        nullable: true
    })
    options: CustomizationOptionType


    @Column({
        type: 'int',
    })
    maxSelection: number;

    @OneToMany(
        () => Customization_item,
        (customization_item) => customization_item.customization,
    )
    customization_items: Customization_item[]

    @CreateDateColumn()
    created_at: Date;


    @UpdateDateColumn()
    updated_at: Date;


}
