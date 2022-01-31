import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CatRequestDto} from "./dto/cats.request.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import {CatsRepository} from "./cats.repository";

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const {email, name, password} = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('냥냥이가 이미 있음');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create(body);
    return cat.readOnlyData;
  }

}
