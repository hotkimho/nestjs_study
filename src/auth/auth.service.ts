import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CatsRepository } from '../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {

  }

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email);

    console.log(cat);
    if (!cat) {
      throw new UnauthorizedException('check email and password');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    console.log(password);
    console.log(cat.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('check eamil and password');
    }

    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
