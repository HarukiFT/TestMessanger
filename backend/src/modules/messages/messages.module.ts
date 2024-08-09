import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { MessagesController } from './messages.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Message, User])],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
