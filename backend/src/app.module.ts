import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), ConfigModule.forRoot({
    isGlobal: true
  }), UsersModule, AuthModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
