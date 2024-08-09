import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messagesRepository: Repository<Message>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}


    async createMessage(senderId: number, receiverId: number, content: string) {
        const sender = await this.usersRepository.findOneBy({
            id: senderId
        })
        const receiver = await this.usersRepository.findOneBy({
            id: receiverId
        })

        if (!sender || !receiver) {
            throw new HttpException('Sender or receiver not found', HttpStatus.FORBIDDEN)
        }

        const message = new Message()
        message.content = content
        message.receiver = receiver
        message.sender = sender
        
        return this.messagesRepository.save(message)
    }

    async fetchMessages(senderId: number, receiverId: number, skip: number) {
        const sender = await this.usersRepository.findOneBy({
            id: senderId
        })
        const receiver = await this.usersRepository.findOneBy({
            id: receiverId
        })

        if (!sender || !receiver) {
            throw new HttpException('Sender or receiver not found', HttpStatus.FORBIDDEN)
        }

        const messages = await this.messagesRepository.createQueryBuilder('message')
            .where('(message.sender = :user1 AND message.receiver = :user2) OR (message.sender = :user2 AND message.receiver = :user1)', {
                user1: sender.id,
                user2: receiver.id
            })
            .orderBy('message.timestamp', 'DESC')
            .skip(skip)
            .getMany()

        return messages
    }
}
