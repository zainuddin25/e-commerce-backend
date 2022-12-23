import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    product_name: string

    @Column()
    ready_stock: number

    @Column()
    category: string

    @Column()
    price: string

    @Column()
    image: string

    @ManyToOne(() => User, (user) => user.product)
    user: User
}