import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"

@Entity('order_items')
export class OrderItem {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type: 'varchar',
        length: 255
    })
    product_name: string;

    @Column({
        type: 'decimal',
        precision: 10, scale: 2
    })
    base_price: number

    @Column({
        type:'int'
    })
    quantity: number



    @Column({
        type:'decimal',
        precision:10, scale: 2
    })
    unit_price: number

    
    @Column({
        type: 'jsonb',
        nullable: true
    })
    customization: any

    
    @ManyToOne(
        () => Order,
        (order) => order.order_items,
        {onDelete: 'CASCADE' }
    )
    @JoinColumn({name: 'order_id' })
    order:Order

    


}