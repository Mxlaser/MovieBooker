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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    jwtService;
    users = [];
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(dto) {
        const userExists = this.users.find(u => u.email === dto.email);
        if (userExists)
            throw new common_1.BadRequestException('Utilisateur déjà inscrit');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = { email: dto.email, password: hashedPassword };
        this.users.push(user);
        return { message: 'Inscription réussie' };
    }
    async login(dto) {
        const user = this.users.find(u => u.email === dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        const token = this.jwtService.sign({ email: user.email });
        return { access_token: token };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map