import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto)
    }
}