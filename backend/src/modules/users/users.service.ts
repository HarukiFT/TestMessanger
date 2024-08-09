import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly usersRepository: Repository<User> 
    ) {}

    async isExist(username: string) {
        const result = await this.usersRepository.findOne({
            where: {
                username: username
            }
        })

        return (result !== null)
    }

    async getById(id: number) {
        return await this.usersRepository.findOneBy({
            id
        })
    }

    async checkAuth(username: string, password: string): Promise<User | never> {
        const userRecord = await this.usersRepository.findOne({
            where: {
                username: username
            }
        })

        if (!userRecord) { return null }
        
        if (await compare(password, userRecord.password)) {
            return userRecord
        }
    }

    async createUser(username: string, password: string) {
        const user = new User()
        user.username = username
        user.password = await hash(password, await genSalt(10))

        await this.usersRepository.save(user)
    }
}