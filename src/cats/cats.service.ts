import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CatRequestDto} from "./dto/cats.request.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const {email, name, password} = body;
    const isCatExist = await this.catModel.exists({email});

    if (isCatExist) {
      throw new UnauthorizedException('냥냥이가 이미 있음');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }

}
