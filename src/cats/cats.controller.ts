import {
    Body,
    UseFilters,
    UseInterceptors,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ReadOnlyCat } from './dto/cat.dto';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private readonly authService: AuthService,
    ) {}

    @ApiOperation({ summary: '현재 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@Req() req: Request) {
        console.log('qwe');
        return req.user;
    }

    @ApiResponse({
        status: 500,
        description: 'server Error...',
    })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: ReadOnlyCat,
    })
    @ApiOperation({ summary: '회원가입' })
    @Post()
    async signUp(
        @Body()
        body: CatRequestDto,
    ) {
        return this.catsService.signUp(body);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('login')
    logIn(@Body() data: LoginRequestDto) {
        return this.authService.jwtLogIn(data);
    }

    @ApiOperation({ summary: '로그아웃' })
    @Post('logout')
    logOut() {
        return '';
    }

    @ApiOperation({ summary: '업로드' })
    @Post('upload/cats')
    uploadCatImg() {
        return '';
    }
}
