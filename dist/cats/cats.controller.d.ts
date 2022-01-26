import { CatsService } from './cats.service';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    getAllCat(): {
        cats: string;
    };
    getOneCat(param: number): string;
    createCat(): string;
    updateCat(): string;
    updatePartialCat(): string;
    deleteCat(): string;
}
