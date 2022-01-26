import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
export declare class AppController {
    private readonly appService;
    private readonly catsService;
    constructor(appService: AppService, catsService: CatsService);
    getHello(): string;
}
