import { Injectable } from '@nestjs/common';
import { AddTokoDto } from './dto/add-toko.dto';
import { Toko } from './entities/toko.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokoService {

    constructor(
        @InjectRepository(User)
        private userRespository: Repository<User>,

        @InjectRepository(Toko)
        private tokoRepository: Repository<Toko>
    ) {}
    
    async createToko(addTokoDto: AddTokoDto) {
        
        const findUser = await this.userRespository.findOneOrFail({
            where: {
                id: addTokoDto.user
            }
        })
        
        const toko = new Toko()
        toko.toko_name = addTokoDto.toko_name,
        toko.user = findUser

        console.log(findUser)
        
        await this.tokoRepository.insert(toko)

        return this.tokoRepository.findOneOrFail({
            where: {
                user: {
                    id: addTokoDto.user
                }
            },
            relations: {
                user: true
            }
        })
    }

}
