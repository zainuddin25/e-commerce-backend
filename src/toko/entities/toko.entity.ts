import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Toko {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    toko_name: string

    @OneToMany(() => Product, (product) => product.toko)
    product: Product

    @OneToOne(() => User, (user) => user.toko)
    @JoinColumn()
    user: User
}