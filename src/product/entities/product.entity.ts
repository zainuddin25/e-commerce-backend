import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { Toko } from "src/toko/entities/toko.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    product_name: string

    @Column()
    ready_stock: number

    @Column()
    price: string

    @Column()
    image: string

    @ManyToOne(() => Category, category => category.product)
    category: Category;

    @ManyToOne(() => Toko, (toko) => toko.product)
    toko: Toko
}