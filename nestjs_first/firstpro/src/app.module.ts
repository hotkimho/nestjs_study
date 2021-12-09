import { Module } from '@nestjs/common';
import { AppController, CatController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cat/cats.controller';
import { CatsService } from './cat/cats.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
