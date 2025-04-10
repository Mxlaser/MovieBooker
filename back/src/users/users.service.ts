import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
    email: string;
    password: string;
}  

@Injectable()
export class UsersService {
    private users: User[] = [];

    constructor(private jwtService: JwtService) {}

    async register(dto: RegisterDto) {
        const userExists = this.users.find(u => u.email === dto.email);
        if (userExists) throw new BadRequestException('Utilisateur déjà inscrit');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = { email: dto.email, password: hashedPassword };
        this.users.push(user);
        return { message: 'Inscription réussie' };
    }

    async login(dto: LoginDto) {
        const user = this.users.find(u => u.email === dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const token = this.jwtService.sign({ email: user.email });
        return { access_token: token };
    }
}
