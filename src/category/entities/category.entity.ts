import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    category_name: string

    @Column()
    icon_category: string
}