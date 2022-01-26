"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const http_exception_filter_1 = require("../common/exceptions/http-exception.filter");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const positiveInt_pipe_1 = require("../common/pipes/positiveInt.pipe");
const cats_service_1 = require("./cats.service");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    getAllCat() {
        console.log('hello controller');
        return { cats: 'get all cat api' };
    }
    getOneCat(param) {
        console.log(param);
        return 'get one cat api';
    }
    createCat() {
        return 'create cat api';
    }
    updateCat() {
        return 'update cat api';
    }
    updatePartialCat() {
        return 'update partial cat api';
    }
    deleteCat() {
        return 'delete service';
    }
};
__decorate([
    common_2.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getAllCat", null);
__decorate([
    common_2.Get(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe, positiveInt_pipe_1.PositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getOneCat", null);
__decorate([
    common_2.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "createCat", null);
__decorate([
    common_2.Put(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "updateCat", null);
__decorate([
    common_1.Patch(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "updatePartialCat", null);
__decorate([
    common_1.Delete(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "deleteCat", null);
CatsController = __decorate([
    common_2.Controller('cats'),
    common_1.UseInterceptors(success_interceptor_1.SuccessInterceptor),
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map