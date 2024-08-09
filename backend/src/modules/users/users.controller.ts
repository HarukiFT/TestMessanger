import { Body, Controller, ForbiddenException, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        if (await this.usersService.isExist(createUserDto.username)) {
            throw new HttpException('Already exists', HttpStatus.BAD_REQUEST)
        }

        await this.usersService.createUser(createUserDto.username, createUserDto.password)
    }
}