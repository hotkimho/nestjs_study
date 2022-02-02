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
  UploadedFiles,
  Param,
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
import { CurrentUser } from '../common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';
import { Cat } from './cats.schema';

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
  getCurrentCat(@CurrentUser() cat) {
    console.log(cat);
    return cat.readOnlyData;
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

  @ApiOperation({ summary: '업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catsService.uploadImg(cat, images);
  }

  @ApiOperation({ summary: '모든 냥냥이 가져오기' })
  @Get('all')
  getAllcat() {
    return this.catsService.getAllcat();
  }
}
