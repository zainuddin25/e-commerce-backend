import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/addDto.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async addCatogory(addCategoryDto: AddCategoryDto) {
        const category = new Category();

        category.category_name = addCategoryDto.category_name
        category.icon_category = addCategoryDto.icon_category

        const result = await this.categoryRepository.insert(category)

        return this.categoryRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id
            }
        })
    }

    async getAll() {
        return this.categoryRepository.findAndCount()
    }

}
