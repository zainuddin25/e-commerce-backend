import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discount {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    discount: string

    @OneToOne(() => Product, (product) => product.discount)
    @JoinColumn()
    product: Product
}