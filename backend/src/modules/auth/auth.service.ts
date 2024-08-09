import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.checkAuth(signInDto.username, signInDto.password)

        if (!user) {
            throw new ForbiddenException()
        }

        const payload = { sub: user.id }
        
        return {
            token: await this.jwtService.signAsync(payload)
        }
    }

    async validateById(id: number) {
        return await this.usersService.getById(id)
    }
}
