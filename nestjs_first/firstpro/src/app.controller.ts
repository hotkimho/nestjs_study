import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { CreateCatDto } from './cat/create-cat.dto';

@Controller('cat')
export class CatController {
  @Get()
  getHello(): string {
    return 'cat hello';
  }
}

//라우팅 경로를 Controller 데코레이터에 설정!!
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //localhost/test get을 받음
  @Get()
  getHello(): string {
    return this.appService.getHello() + 'test code';
  }

  //localhost/test/cat get을 받음
  @Get('cat')
  getCat(): string {
    return 'cat!!!!';
  }

  @Get(':id')
  getId(@Param('id') id): string {
    console.log(id);
    return `return value : ${id}`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'create cat';
  }
}
