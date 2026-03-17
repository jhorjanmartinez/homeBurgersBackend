import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { orderOptions } from "./order-options.entity";
import { OrderItem } from "./order-item.entity";

@Entity('orders')
export class Order {
    
    @PrimaryGeneratedColumn('uuid')
    id:string


    @Column({
        type: 'varchar',
        length: 255
    })
    customer_name: string

    @Column({
        type:'varchar',
        length: 10
    })
    customer_phone: string;


    @Column({
        type:'enum',
        enum: orderOptions,
        default: orderOptions.PENDING
    })
    status: orderOptions


    @Column({
        type: 'decimal',
        precision: 10, scale: 2
    })
    total_amount: number

    @OneToMany(
        () => OrderItem,
        (orderItem) => orderItem.order,
        {cascade: true}
    )
    order_items: OrderItem[]

    @CreateDateColumn()
    created_at: Date

}
