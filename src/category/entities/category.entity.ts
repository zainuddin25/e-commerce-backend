import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    category_name: string

    @Column()
    icon_category: string

    @OneToMany(() => Product, product => product.category)
    product: Product
}