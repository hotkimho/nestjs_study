import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from '../../cats/cats.repository';
import { Cat } from '../../cats/cats.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload): Promise<Cat> {
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat; //request.user 안에 저장됨
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}
