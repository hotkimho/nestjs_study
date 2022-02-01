import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
        // console.log(Cat.name);
    }

    async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
        return this.catModel.findById(catId).select('-password');
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            return await this.catModel.exists({ email });
        } catch (error) {
            throw new HttpException('db error', 400);
        }
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        const user = await this.catModel.findOne({ email });
        return user;
    }
}
